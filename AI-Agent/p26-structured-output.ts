// p26-structured-output.ts
import { z } from "zod";
import OpenAI from "openai";

// 用 OpenAI 兼容 SDK 访问模型，这里默认接的是 OpenRouter。
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

// 允许通过环境变量切换模型，方便调试和复用。
const model = process.env.OPENAI_MODEL || "openai/gpt-oss-120b:free";

// 定义代码审查结果的 Schema
const IssueSchema = z.object({
  severity: z.enum(["critical", "warning", "suggestion"]),
  message: z.string(),
  fix: z.string(),
  line: z.number().optional(),
});

const ReviewSchema = z.object({
  score: z.number().min(0).max(10),
  summary: z.string(),
  issues: z.array(IssueSchema),
  approvable: z.boolean(),
});

// 从 Schema 推导 TypeScript 类型，无需手写 interface
type Review = z.infer<typeof ReviewSchema>;

// 这里手写 JSON Schema 给模型约束输出格式，避免依赖 helper 与 zod 版本兼容问题。
export const ReviewJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    score: {
      type: "number",
      minimum: 0,
      maximum: 10,
    },
    summary: {
      type: "string",
    },
    issues: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          severity: {
            type: "string",
            enum: ["critical", "warning", "suggestion"],
          },
          message: {
            type: "string",
          },
          fix: {
            type: "string",
          },
          line: {
            type: "number",
          },
        },
        required: ["severity", "message", "fix"],
      },
    },
    approvable: {
      type: "boolean",
    },
  },
  required: ["score", "summary", "issues", "approvable"],
} as const;

export { ReviewSchema };

// 先把模型返回的 JSON 字符串转成对象，再用 Zod 做运行时校验。
export function extractReviewFromContent(content: string): Review {
  return ReviewSchema.parse(JSON.parse(content));
}

function getMessageTextContent(content: unknown): string {
  // 有些兼容接口直接返回字符串。
  if (typeof content === "string") {
    return content;
  }

  // 也有些接口会把内容拆成多个文本块，这里把所有 text 片段拼回完整字符串。
  if (Array.isArray(content)) {
    return content
      .filter(
        (item): item is { type: "text"; text: string } =>
          typeof item === "object" &&
          item !== null &&
          "type" in item &&
          item.type === "text" &&
          "text" in item &&
          typeof item.text === "string",
      )
      .map((item) => item.text)
      .join("");
  }

  throw new Error("模型返回的 content 不是可解析的文本。");
}

async function reviewCode(code: string): Promise<Review | null> {
  const completion = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: "你是代码审查专家，找出代码问题并给出评分，以 JSON 格式输出。",
      },
      {
        role: "user",
        content: `请审查以下代码：\n\n\`\`\`typescript\n${code}\n\`\`\``,
      },
    ],
    // 让模型按固定 JSON Schema 输出，便于后续自动解析。
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "review",
        strict: true,
        schema: ReviewJsonSchema,
      },
    },
  });

  const message = completion.choices[0].message;

  // 模型可能因为安全策略等原因拒绝回答，调用方需要显式处理。
  if (message.refusal) {
    console.error("模型拒绝了请求：", message.refusal);
    return null;
  }

  // SDK 返回的 content 先标准化成字符串，再解析为受 Zod 保护的 Review 对象。
  return extractReviewFromContent(getMessageTextContent(message.content));
}

function printReview(review: Review): void {
  const status = review.approvable ? "[通过]" : "[需修改]";
  console.log(`\n${status} 评分：${review.score}/10`);
  console.log(`评价：${review.summary}\n`);

  // 按严重级别分组打印，输出会更接近真实代码审查报告。
  for (const group of ["critical", "warning", "suggestion"] as const) {
    const items = review.issues.filter((i) => i.severity === group);
    if (items.length === 0) continue;

    console.log(`[${group.toUpperCase()}]`);
    for (const issue of items) {
      const loc = issue.line ? ` (第${issue.line}行)` : "";
      console.log(`  - ${issue.message}${loc}`);
      console.log(`    改进：${issue.fix}`);
    }
  }
}

async function main(): Promise<void> {
  // 示例代码故意带有 SQL 注入、any、错误处理缺失等问题，便于观察审查结果。
  const code = `
async function getUserData(userId: string) {
  const query = \`SELECT * FROM users WHERE id = \${userId}\`
  const result = await db.query(query)
  return result[0]
}

async function processPayment(amount: any, currency: any) {
  const response = await fetch('/api/pay', {
    method: 'POST',
    body: JSON.stringify({ amount, currency })
  })
  return response.json()
}`;

  const review = await reviewCode(code);
  if (review) printReview(review);
}

// 顶层兜底，避免未捕获异常静默失败。
main().catch(console.error);






// [需修改] 评分：4/10
// 评价：The code contains a critical security flaw (SQL injection) and several type‑safety, error‑handling, and maintainability issues. Refactor with parameterised queries, proper typings, error handling, and explicit return types to improve the score.

// [CRITICAL]
//   - Use parameterised queries or a query builder to avoid injection. (第3行)
//     改进：SQL Injection vulnerability – user‑supplied `userId` is interpolated directly into the SQL string.
// [WARNING]
//   - Define proper types (e.g., `amount: number`, `currency: string`). (第9行)
//     改进：Missing type safety – `amount` and `currency` are typed as `any`.
//   - Inject base URL via configuration or use absolute URL when running outside the browser. (第10行)
//     改进：Hard‑coded API endpoint – using a relative URL (`/api/pay`) may break in server‑side contexts.
//   - Wrap calls in try/catch, check for empty results, and handle non‑2xx HTTP responses. (第4行)
//     改进：No error handling for database query and fetch request.
//   - Validate that a row exists before returning, or return `null`/throw an error. (第5行)
//     改进：Potential undefined access – `result[0]` may be undefined if no user is found.
// [SUGGESTION]
//   - Add return type annotations (e.g., `Promise<User | null>`). (第1行)
//     改进：Missing explicit return types for async functions.
