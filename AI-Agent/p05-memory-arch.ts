// p05-memory-arch.ts
import OpenAI from "openai";
import { readFile, writeFile } from "fs/promises";

type MessageParam = OpenAI.ChatCompletionMessageParam;
type LongTermStore = Record<string, string>;

// 短期记忆：维护当前对话的消息历史
class ShortTermMemory {
  private messages: MessageParam[] = [];

  add(role: "user" | "assistant", content: string): void {
    this.messages.push({ role, content });
  }

  getAll(): MessageParam[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
  }

  get length(): number {
    return this.messages.length;
  }
}

// 工作记忆：追踪当前任务的执行状态
class WorkingMemory {
  private state: Record<string, unknown> = {};

  set(key: string, value: unknown): void {
    this.state[key] = value;
  }

  get(key: string): unknown {
    return this.state[key];
  }

  clear(): void {
    this.state = {};
  }

  getSnapshot(): Record<string, unknown> {
    return { ...this.state };
  }
}

// 长期记忆：跨会话持久化的 JSON 文件
class LongTermMemory {
  private store: LongTermStore = {};
  private readonly filePath: string;

  constructor(filePath: string = "memory.json") {
    this.filePath = filePath;
  }

  async load(): Promise<void> {
    try {
      const raw = await readFile(this.filePath, "utf-8");
      this.store = JSON.parse(raw) as LongTermStore;
      console.log(`[长期记忆已加载] ${Object.keys(this.store).length} 条记录`);
    } catch {
      // 文件不存在时从空状态开始，属于正常情况
      this.store = {};
      console.log("[长期记忆] 未找到已有记忆，从空状态开始");
    }
  }

  async save(): Promise<void> {
    await writeFile(
      this.filePath,
      JSON.stringify(this.store, null, 2),
      "utf-8",
    );
    console.log(`[长期记忆已保存] ${this.filePath}`);
  }

  remember(key: string, value: string): void {
    this.store[key] = value;
    console.log(`[长期记忆写入] ${key} = ${value}`);
  }

  recall(key: string): string | undefined {
    return this.store[key];
  }

  getAll(): LongTermStore {
    return { ...this.store };
  }
}

// 组合三层记忆的 Agent
class MemoryAgent {
  private client: OpenAI;
  private shortTerm: ShortTermMemory;
  private working: WorkingMemory;
  private longTerm: LongTermMemory;

  constructor(memoryFilePath?: string) {
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
    });
    this.shortTerm = new ShortTermMemory();
    this.working = new WorkingMemory();
    this.longTerm = new LongTermMemory(memoryFilePath);
  }

  // 将长期记忆注入 system prompt
  private buildSystemPrompt(): string {
    const longTermData = this.longTerm.getAll();
    const entries = Object.entries(longTermData);

    if (entries.length === 0) {
      return "你是一个有记忆能力的 AI 助手。";
    }

    const memoryLines = entries.map(([k, v]) => `- ${k}：${v}`).join("\n");
    return `你是一个有记忆能力的 AI 助手。

[已知用户信息]
${memoryLines}

请在对话中自然地利用这些已知信息。`;
  }

  async init(): Promise<void> {
    await this.longTerm.load();
  }

  async chat(userMessage: string): Promise<string> {
    // 把用户消息加入短期记忆
    this.shortTerm.add("user", userMessage);

    const response = await this.client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages: [
        { role: "system", content: this.buildSystemPrompt() },
        ...this.shortTerm.getAll(),
      ],
    });

    const assistantText = response.choices[0].message.content ?? "";

    // 把助手回复加入短期记忆，保持对话连贯
    this.shortTerm.add("assistant", assistantText);

    return assistantText;
  }

  // 手动提取关键信息存入长期记忆
  remember(key: string, value: string): void {
    this.longTerm.remember(key, value);
  }

  async saveMemory(): Promise<void> {
    await this.longTerm.save();
  }

  // 开启新会话（清空短期记忆和工作记忆，保留长期记忆）
  newSession(): void {
    this.shortTerm.clear();
    this.working.clear();
    console.log("\n[新会话开始] 短期记忆已清空，长期记忆保留");
  }

  getWorkingMemory(): WorkingMemory {
    return this.working;
  }
}

async function main() {
  const agent = new MemoryAgent("memory.json");
  await agent.init();

  console.log("=== 第一轮会话 ===\n");

  // 用户自我介绍
  const msg1 = "你好，我叫张三，我是一名前端工程师，平时喜欢用 TypeScript。";
  console.log(`用户：${msg1}`);
  const reply1 = await agent.chat(msg1);
  console.log(`Agent：${reply1}\n`);

  // 手动将关键信息存入长期记忆
  agent.remember("user_name", "张三");
  agent.remember("user_profession", "前端工程师");
  agent.remember("preferred_language", "TypeScript");
  await agent.saveMemory();

  // 工作记忆：记录当前任务状态
  const wm = agent.getWorkingMemory();
  wm.set("onboarding_complete", true);
  wm.set("session_count", 1);

  console.log("\n--- 模拟结束第一次会话，开启第二次会话 ---");
  agent.newSession();

  console.log("\n=== 第二轮会话（新会话，长期记忆已加载） ===\n");

  const msg2 = "你还记得我叫什么名字吗？";
  console.log(`用户：${msg2}`);
  const reply2 = await agent.chat(msg2);
  console.log(`Agent：${reply2}\n`);

  const msg3 = "我最喜欢用哪种编程语言？";
  console.log(`用户：${msg3}`);
  const reply3 = await agent.chat(msg3);
  console.log(`Agent：${reply3}\n`);
}

main().catch(console.error);
