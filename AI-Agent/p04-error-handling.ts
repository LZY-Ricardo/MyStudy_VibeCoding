// p04-error-handling.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

// 重试配置
const RETRY_CONFIG = {
  maxAttempts: 4,
  baseDelay: 1000, // 1 秒
  jitter: 500, // 最多额外 500ms 随机延迟
  maxDelay: 30_000, // 最长等待 30 秒
} as const;

// Agent 循环保护
const MAX_ITERATIONS = 10;

// 可重试的 HTTP 状态码
const RETRYABLE_STATUS = new Set([429, 500, 503]);

// 睡眠函数
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = RETRY_CONFIG.maxAttempts,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // 只有 Open AI API 错误才重试
      if (!(error instanceof OpenAI.APIError)) {
        throw error;
      }

      // 不可重试的错误 立刻抛出
      if (!RETRYABLE_STATUS.has(error.status)) {
        throw error;
      }

      // 已经是最后一次尝试了
      if (attempt === maxAttempts) {
        break;
      }

      // 计算指数退避的等待时间
      const exponential = RETRY_CONFIG.baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * RETRY_CONFIG.jitter;
      const delay = Math.min(exponential + jitter, RETRY_CONFIG.maxDelay);

      console.log(
        `[retry] attempt ${attempt + 1}/${maxAttempts} failed` +
          ` (${error.status} ${error.type ?? "unknown"}).` +
          ` Waiting ${Math.round(delay)}ms...`,
      );

      await sleep(delay);
    }
  }

  throw lastError;
}

// 模拟一个有时会失败的数据查询工具（30% 概率抛错）
function query_database(table: string, id: number): string {
  if (Math.random() < 0.3) {
    throw new Error(
      `Database connection timeout: failed to query ${table}#${id}`,
    );
  }

  const records: Record<string, Record<number, string>> = {
    users: {
      1: "Alice (alice@example.com)",
      2: "Bob (bob@example.com)",
    },
    orders: {
      101: "Order #101: 3x TypeScript Book, $89.00",
      102: "Order #102: 1x Mechanical Keyboard, $159.00",
    },
  };
  return records[table]?.[id] ?? `No record found in ${table} with id=${id}`;
}

// 工具声明
const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "query_database",
      description:
        "查询数据库中的记录。table 支持 users 和 orders，id 为记录编号",
      parameters: {
        type: "object",
        properties: {
          table: {
            type: "string",
            description: "表名：users 或 orders",
          },
          id: {
            type: "number",
            description: "记录 ID",
          },
        },
        required: ["table", "id"],
      },
    },
  },
];

type ToolInput = {
  table: string;
  id: number;
};

async function runAgent(userMessage: string): Promise<void> {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "user",
      content: userMessage,
    },
  ];

  let iterations = 0;

  while (iterations < MAX_ITERATIONS) {
    iterations++;
    console.log(`\n[loop] iteration ${iterations}/${MAX_ITERATIONS}`);

    // 调用 API，有重试保护
    const response = await withRetry(() =>
      client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "openai/gpt-oss-120b:free",
        messages,
        tools,
      }),
    );

    const message = response.choices[0].message;
    messages.push(message);

    if (message.content) {
      console.log(`\nAgent: ${message.content}`);
    }

    if (response.choices[0].finish_reason === "stop") {
      return;
    }

    if (
      response.choices[0].finish_reason !== "tool_calls" ||
      !message.tool_calls
    ) {
      console.log(
        `[warn] unexpected finish_reason: ${response.choices[0].finish_reason}`,
      );
      return;
    }

    // 执行工具，捕获所有错误
    for (const toolCall of message.tool_calls) {
      if (toolCall.type !== "function") continue;

      const input = JSON.parse(toolCall.function.arguments) as ToolInput;
      console.log(
        `[tool] ${toolCall.function.name}(table="${input.table}", id=${input.id})`,
      );

      let content: string;

      try {
        content = query_database(input.table, input.id);
        console.log(`[tool] success: ${content}`);
      } catch (error) {
        // 工具执行失败了，记录错误信息并把它当作工具结果返回给模型
        content = `Error: ${(error as Error).message}`;
        console.log(`[tool] execution failed: ${content}`);
      }

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content,
      });
    }
  }

  console.log(`[error] reached max iterations (${MAX_ITERATIONS}), exiting.`);
}

// 运行示例
runAgent(
  "帮我查一下用户 ID 为 1 的信息，以及订单 101 的详情, 如果遇到错误请重试",
).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
