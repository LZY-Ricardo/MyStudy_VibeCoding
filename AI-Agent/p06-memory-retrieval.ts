// p06-memory-retrieval.ts
import OpenAI from "openai";

interface MemoryEntry {
  id: string;
  content: string;
  tags: string[];
  importance: number; // 1-10，越高越优先注入
  createdAt: string;
}

class MemoryBank {
  private memories: MemoryEntry[] = [];

  add(content: string, tags: string[], importance: number = 5): void {
    const entry: MemoryEntry = {
      id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      content,
      tags,
      importance,
      createdAt: new Date().toISOString(),
    };
    this.memories.push(entry);
  }

  search(query: string, topK: number = 3): MemoryEntry[] {
    // 简单分词：按空格和标点切分，转小写
    const keywords = query
      .toLowerCase()
      .split(/[\s，。？！、,.\?!]+/)
      .filter((w) => w.length > 0);

    if (keywords.length === 0) {
      // 无关键词时，按重要性返回 top-K
      return [...this.memories]
        .sort((a, b) => b.importance - a.importance)
        .slice(0, topK);
    }

    // 计算每条记忆的相关性得分
    const scored = this.memories.map((mem) => {
      const lowerTags = mem.tags.map((t) => t.toLowerCase());
      const hitCount = keywords.filter((kw) =>
        lowerTags.some((tag) => tag.includes(kw) || kw.includes(tag)),
      ).length;

      // 综合得分 = 关键词命中数 × 重要性
      const score = hitCount * mem.importance;
      return { mem, score, hitCount };
    });

    return scored
      .filter(({ hitCount }) => hitCount > 0) // 至少命中一个关键词
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(({ mem }) => mem);
  }

  formatForContext(memories: MemoryEntry[]): string {
    if (memories.length === 0) return "";

    const lines = memories.map(
      (mem) => `- ${mem.content} [标签: ${mem.tags.join(", ")}]`,
    );
    return `以下是与当前问题相关的历史记忆，请参考：\n${lines.join("\n")}`;
  }

  all(): MemoryEntry[] {
    return [...this.memories];
  }
}

class MemoryAgent {
  private client: OpenAI;
  private bank: MemoryBank;
  private baseSystemPrompt: string;

  constructor(bank: MemoryBank, systemPrompt: string = "") {
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
    });
    this.bank = bank;
    this.baseSystemPrompt = systemPrompt;
  }

  async chat(userMessage: string): Promise<string> {
    // 1. 检索相关记忆
    const relevantMemories = this.bank.search(userMessage, 3);
    const memoryContext = this.bank.formatForContext(relevantMemories);

    if (relevantMemories.length > 0) {
      console.log(`[检索到 ${relevantMemories.length} 条相关记忆]`);
      relevantMemories.forEach((mem) => {
        console.log(`  - ${mem.content} (重要性: ${mem.importance})`);
      });
    } else {
      console.log("[未检索到相关记忆，使用基础 system prompt]");
    }

    // 2. 构建注入了记忆的 system prompt
    const systemPrompt = memoryContext
      ? `${this.baseSystemPrompt}\n\n${memoryContext}`.trim()
      : this.baseSystemPrompt;

    // 3. 调用模型
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "user", content: userMessage },
    ];

    if (systemPrompt) {
      messages.unshift({ role: "system", content: systemPrompt });
    }

    const response = await this.client.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      messages,
    });

    return response.choices[0].message.content ?? "";
  }
}

async function main() {
  const bank = new MemoryBank();

  // 预置记忆：模拟之前对话中积累的信息
  bank.add(
    "用户喜欢简洁的代码风格，不需要过多注释",
    ["偏好", "编程", "代码风格"],
    9,
  );
  bank.add(
    "用户正在做一个 TypeScript Agent 项目",
    ["项目", "TypeScript", "Agent"],
    8,
  );
  bank.add("用户不喜欢过长的解释，直接给结论", ["偏好", "沟通", "回复风格"], 8);
  bank.add("用户的操作系统是 macOS", ["环境", "系统", "macOS"], 5);
  bank.add("用户学过 Python，熟悉异步编程", ["背景", "Python", "异步"], 6);

  console.log("=== 预置记忆 ===");
  bank.all().forEach((mem) => {
    console.log(`  [${mem.importance}] ${mem.content}`);
    console.log(`      标签: ${mem.tags.join(", ")}`);
  });
  console.log();

  const agent = new MemoryAgent(bank, "你是一个编程助手，用中文简洁回答问题。");

  // 测试 1：编程问题——应该检索到代码风格和项目偏好
  console.log("=== 提问 1：按照我的代码风格，帮我写一个 TypeScript 的 sleep 函数 ===");
  const answer1 = await agent.chat("按照我的代码风格，帮我写一个 TypeScript 的 sleep 函数");
  console.log("Agent:", answer1);
  console.log();

  // 测试 2：沟通偏好——应该检索到回复风格记忆
  console.log("=== 提问 2：按照我喜欢的回复风格，解释一下 async/await ===");
  const answer2 = await agent.chat("按照我喜欢的回复风格，解释一下 async/await");
  console.log("Agent:", answer2);
  console.log();

  // 测试 3：系统相关——应该检索到 macOS 记忆
  console.log("=== 提问 3：怎么查看系统进程？ ===");
  const answer3 = await agent.chat("怎么查看系统进程？");
  console.log("Agent:", answer3);
}

main().catch(console.error);