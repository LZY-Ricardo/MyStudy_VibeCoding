import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

// 每 4 个字符估算为 1 个 Token（粗略，够用于预算控制）
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// 把消息内容统一转为字符串用于估算
function messageToText(
  message: OpenAI.Chat.ChatCompletionMessageParam,
): string {
  if (typeof message.content === "string") {
    return message.content;
  }
  if (!message.content) {
    return "";
  }
  return message.content
    .map((block) => {
      if (typeof block === "string") {
        return block;
      }
      return "";
    })
    .join("");
}

class ChatSession {
  private messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  private systemPrompt: string;
  private maxTokenEstimate: number;

  constructor(systemPrompt: string, maxTokenEstimate: number = 4000) {
    this.systemPrompt = systemPrompt;
    this.maxTokenEstimate = maxTokenEstimate;
  }

  addMessage(role: "user" | "assistant", content: string): void {
    const message: OpenAI.Chat.ChatCompletionMessageParam = { role, content };
    this.messages.push(message);
  }

  // 估算当前历史对话的总 token 数量
  estimateHistoryTokens(): number {
    const historyText = this.messages.map(messageToText).join(" ");
    return estimateTokens(historyText) + estimateTokens(this.systemPrompt);
  }

  // 裁剪历史: 从最早的消息开始删除，直到估算的 token 数量在限制范围内
  trimHistory(maxTokenEstimate: number): void {
    while (
      this.messages.length > 2 && // 至少保留系统提示和最后一轮对话
      this.estimateHistoryTokens() > maxTokenEstimate
    ) {
      // 每次删除最早的一对消息(assistant 和 user)
      this.messages.splice(0, 2);
      console.log(
        `  [trim] 历史过长，删除最旧一对消息，剩余 ${this.messages.length} 条`,
      );
    }
  }

  getHistoryLength(): number {
    return this.messages.length;
  }

  async chat(userInput: string): Promise<string> {
    // 添加用户输入
    this.addMessage("user", userInput);

    // 发送前检查历史长度，必要时裁剪
    this.trimHistory(this.maxTokenEstimate);

    // 发送请求
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "openai/gpt-oss-120b:free",
      messages: [
        { role: "system", content: this.systemPrompt },
        ...this.messages,
      ]
    });

    // 提取文本回复
    const assistantText = response.choices[0].message.content || "";

    // 添加助手回复到历史
    this.addMessage("assistant", assistantText);

    return assistantText;
  }
}

async function main() {
  const session = new ChatSession(
    "你是一名简洁的编程助手，回答控制在 100 字以内。",
    200, // 约 200 Token 预算，故意设小以便演示裁剪
  );

  const turns: string[] = [
    "用 TypeScript 写一个计算数组平均值的函数",
    "改成支持忽略 undefined 值",
    "加上单元测试",
    "把这个函数改成支持加权平均",
  ];

  for (let i = 0; i < turns.length; i++) {
    const userInput = turns[i];
    console.log(`\n--- 第 ${i + 1} 轮 ---`);
    console.log(`用户：${userInput}`);

    const reply = await session.chat(userInput);

    console.log(`助手：${reply}`);
    console.log(
      `历史长度：${session.getHistoryLength()} 条，` +
        `估算 Token：${session.estimateHistoryTokens()}`,
    );
  }
}

main().catch((error) => {
  console.error("发生错误：", error);
  process.exit(1);
});