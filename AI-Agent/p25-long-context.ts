// p25-long-context.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});
const model = process.env.OPENAI_MODEL || "openai/gpt-oss-120b:free";

type Message = OpenAI.ChatCompletionMessageParam;

// 估算 token 数（粗略，偏保守）
function estimateTokens(messages: Message[]): number {
  return messages.reduce((total, m) => {
    const text = typeof m.content === "string" ? m.content : "";
    return total + Math.ceil(text.length / 2.5) + 4; // 4 为消息格式开销
  }, 0);
}

// 滑动窗口：保留 system + 最近 maxRounds 轮
function slidingWindow(messages: Message[], maxRounds: number): Message[] {
  const system = messages.filter((m) => m.role === "system");
  const dialog = messages.filter((m) => m.role !== "system");
  const keep = dialog.slice(-maxRounds * 2); // 每轮 user + assistant = 2条
  return [...system, ...keep];
}

// 将旧历史压缩成一段摘要
async function summarizeHistory(
  oldMessages: Message[],
  previousSummary: string,
): Promise<string> {
  const historyText = oldMessages
    .map((m) => `${m.role === "user" ? "用户" : "助手"}: ${m.content}`)
    .join("\n");

  const prompt = previousSummary
    ? `已有摘要：\n${previousSummary}\n\n新增对话：\n${historyText}\n\n请合并为新摘要，保留所有关键信息、决策和约定。`
    : `请将以下对话压缩为简洁摘要，保留关键信息：\n\n${historyText}`;

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 600,
    temperature: 0.2, // 低温度让摘要更确定性
  });

  return response.choices[0].message.content ?? "";
}

class LongContextManager {
  private messages: Message[] = [];
  private summary: string = "";
  private readonly tokenThreshold: number;

  constructor(
    systemPrompt: string,
    tokenThreshold: number = 3000, // 超出此 token 数触发压缩
  ) {
    this.messages = [{ role: "system", content: systemPrompt }];
    this.tokenThreshold = tokenThreshold;
  }

  // 构建发送给 API 的 messages（含摘要注入）
  private buildMessages(): Message[] {
    const systemContent = this.summary
      ? `${this.messages[0].content}\n\n[历史摘要]\n${this.summary}`
      : String(this.messages[0].content);

    return [
      { role: "system", content: systemContent },
      ...this.messages.slice(1),
    ];
  }

  private async compressIfNeeded(): Promise<void> {
    if (estimateTokens(this.messages) <= this.tokenThreshold) return;

    console.log(`[压缩] Token 超出阈值，开始摘要压缩...`);

    const dialog = this.messages.slice(1);
    const toSummarize = dialog.slice(0, -4); // 压缩除最近 4 条外的旧历史
    const toKeep = dialog.slice(-4);

    if (toSummarize.length === 0) return;

    this.summary = await summarizeHistory(toSummarize, this.summary);
    this.messages = [this.messages[0], ...toKeep];

    console.log(
      `[压缩] 完成，当前估算 token: ${estimateTokens(this.messages)}`,
    );
  }

  async chat(userInput: string): Promise<string> {
    this.messages.push({ role: "user", content: userInput });
    await this.compressIfNeeded();

    const response = await client.chat.completions.create({
      model,
      messages: this.buildMessages(),
    });

    const reply = response.choices[0].message.content ?? "";
    this.messages.push({ role: "assistant", content: reply });
    return reply;
  }
}

async function main(): Promise<void> {
  const manager = new LongContextManager(
    "你是专业的 TypeScript 编程助手，回答简洁专业。",
    2000, // 故意设小以演示触发
  );

  const turns = [
    "我在做电商项目，主要用 TypeScript + React，后端是 Node.js",
    "购物车怎么设计比较好？",
    "如果要支持优惠券怎么扩展？",
    "库存检查应该在哪层做？",
    "怎么处理并发下单时的库存竞争？",
    "你还记得我们项目的技术栈吗？", // 这条会测试摘要是否保留了早期信息
  ];

  for (const turn of turns) {
    console.log(`\n用户: ${turn}`);
    const reply = await manager.chat(turn);
    console.log(`助手: ${reply.slice(0, 150)}...`);
  }
}

main().catch(console.error);