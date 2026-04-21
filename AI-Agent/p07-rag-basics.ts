// p07-rag-basics.ts
import OpenAI from "openai";

interface Chunk {
  id: string;
  content: string;
  source: string;
  vector: number[];
}

// 全局词汇表，在所有文档加入后构建
let vocabulary: string[] = [];

/**
 * naiveVectorize：词频向量，仅用于演示。
 * 生产环境请使用 Embedding 模型（如 text-embedding-3-large / text-embedding-3-small）。
 */
function naiveVectorize(text: string): number[] {
  if (vocabulary.length === 0) return [];

  // 简单分词：按空格和标点切分，转小写，过滤空字符串
  const words = text
    .toLowerCase()
    .split(/[\s,.?!，。？！、：:；;\n\r\t]+/)
    .filter((w) => w.length > 0);

  // 统计每个词在当前文本中的出现次数
  const freqMap: Record<string, number> = {};
  for (const word of words) {
    freqMap[word] = (freqMap[word] ?? 0) + 1;
  }

  // 按词汇表顺序构建向量
  const vec = vocabulary.map((term) => freqMap[term] ?? 0);

  // L2 归一化：除以向量长度，确保余弦相似度等价于点积
  const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  if (norm === 0) return vec;

  return vec.map((v) => v / norm);
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  return a.reduce((sum, ai, i) => sum + ai * (b[i] ?? 0), 0);
}

class DocumentStore {
  private chunks: Chunk[] = [];

  /**
   * 添加文档：分块 → 收集词汇 → 全量重新向量化
   */
  addDocument(
    content: string,
    source: string,
    chunkSize: number = 200,
    overlap: number = 40,
  ): void {
    const newChunks = this.splitIntoChunks(content, source, chunkSize, overlap);
    this.chunks.push(...newChunks);

    // 重建词汇表并重新向量化所有分块
    this.rebuildVocabularyAndVectorize();

    console.log(`[文档已加载: ${newChunks.length} 个片段 | 来源: ${source}]`);
  }

  private splitIntoChunks(
    content: string,
    source: string,
    chunkSize: number,
    overlap: number,
  ): Chunk[] {
    const chunks: Chunk[] = [];
    let start = 0;
    let index = 0;

    while (start < content.length) {
      const end = Math.min(start + chunkSize, content.length);
      const chunkContent = content.slice(start, end).trim();

      if (chunkContent.length > 0) {
        chunks.push({
          id: `${source}#${index}`,
          content: chunkContent,
          source,
          vector: [], // 先占位，rebuildVocabularyAndVectorize 中填充
        });
        index++;
      }

      // 下一块从 start + chunkSize - overlap 开始，实现重叠
      start += chunkSize - overlap;
    }

    return chunks;
  }

  private rebuildVocabularyAndVectorize(): void {
    // 收集所有分块中出现的所有词，构建全局词汇表
    const vocabSet = new Set<string>();
    for (const chunk of this.chunks) {
      const words = chunk.content
        .toLowerCase()
        .split(/[\s,.?!，。？！、：:；;\n\r\t]+/)
        .filter((w) => w.length > 0);
      for (const word of words) vocabSet.add(word);
    }
    vocabulary = Array.from(vocabSet).sort();

    // 对所有分块重新计算向量（词汇表变了，旧向量失效）
    for (const chunk of this.chunks) {
      chunk.vector = naiveVectorize(chunk.content);
    }
  }

  /**
   * 向量检索：把查询向量化，与所有分块做余弦相似度，取 top-K
   */
  search(query: string, topK: number = 3): Chunk[] {
    if (this.chunks.length === 0) return [];

    const queryVec = naiveVectorize(query);

    const scored = this.chunks.map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryVec, chunk.vector),
    }));

    return scored
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(({ chunk }) => chunk);
  }

  /**
   * 把检索结果格式化为注入 system prompt 的上下文字符串
   */
  formatContext(chunks: Chunk[]): string {
    if (chunks.length === 0) return "";

    const sections = chunks.map(
      (chunk, i) =>
        `[文档片段 ${i + 1} | 来源: ${chunk.source}]\n${chunk.content}`,
    );

    return `以下是与问题相关的文档内容，请基于这些内容回答：\n\n${sections.join("\n\n")}`;
  }

  get totalChunks(): number {
    return this.chunks.length;
  }
}

class RAGAgent {
  private client: OpenAI;
  private store: DocumentStore;
  private baseSystem: string;

  constructor(store: DocumentStore, baseSystem: string = "") {
    this.client = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
    });
    this.store = store;
    this.baseSystem = baseSystem;
  }

  async chat(userMessage: string): Promise<string> {
    // 1. 检索相关片段
    const relevantChunks = this.store.search(userMessage, 3);

    if (relevantChunks.length > 0) {
      console.log(`[检索到 ${relevantChunks.length} 个相关片段]`);
      relevantChunks.forEach((chunk, i) => {
        const preview = chunk.content.slice(0, 60).replace(/\n/g, " ");
        console.log(`  片段${i + 1}: ${preview}...`);
      });
    } else {
      console.log("[未找到相关片段，依赖模型自身知识]");
    }

    // 2. 构建注入了检索内容的 system prompt
    const context = this.store.formatContext(relevantChunks);
    const systemPrompt = context
      ? `${this.baseSystem}\n\n${context}`.trim()
      : this.baseSystem;

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
  const store = new DocumentStore();

  // 预置文档：几段关于 TypeScript 和 Agent 的技术说明
  store.addDocument(
    `TypeScript 的 interface 和 type 都用于描述对象的形状。
interface 支持声明合并（Declaration Merging）：同名的两个 interface 会自动合并成一个。
type 不支持声明合并，重复声明会报错。
interface 只能描述对象结构，不能直接表示联合类型。
type 更灵活：支持联合类型（A | B）、交叉类型（A & B）和条件类型（T extends U ? X : Y）。
interface 可以用 extends 关键字继承其他 interface，也可以继承 type。
通常建议：描述对象形状优先用 interface，需要联合或条件类型时用 type。`,
    "typescript-types.md",
    150,
    30,
  );

  store.addDocument(
    `AI Agent 的核心循环是 ReAct 模式：Reason（推理）和 Act（行动）交替进行。
Agent 接收用户输入后，先推理下一步应该做什么，再调用工具执行，观察结果，再推理，如此循环。
工具调用（Tool Use）是 Agent 与外界交互的唯一方式：读写文件、调用 API、执行代码都通过工具完成。
上下文窗口是 Agent 的工作记忆：所有对话历史、工具调用结果都存在这里。
当上下文窗口接近上限时，需要压缩策略：保留关键消息，丢弃或摘要旧消息。
多 Agent 系统中，Orchestrator 负责任务分解，Sub-agent 负责具体执行。`,
    "agent-basics.md",
    150,
    30,
  );

  store.addDocument(
    `RAG（检索增强生成）的核心思想：不把所有文档塞进上下文，只检索相关片段。
RAG 流水线：文档分块 → 向量化 → 存储 → 查询向量化 → 相似度检索 → 注入上下文 → 生成。
分块策略影响检索质量：块太大语义模糊，块太小上下文不足。通常 200-500 字符为宜。
Embedding 模型把文本转为高维向量，语义相似的文本在向量空间中距离近。
常用 Embedding 模型：OpenAI text-embedding-3-large、OpenAI text-embedding-3-small、本地模型 all-MiniLM-L6-v2。
向量数据库负责高效存储和检索向量：Qdrant、Chroma、pgvector 是常见选择。
混合检索（关键词 + 向量）比单纯向量检索有更好的召回率。`,
    "rag-overview.md",
    150,
    30,
  );

  console.log(`\n[知识库初始化完成，共 ${store.totalChunks} 个分块]\n`);

  const agent = new RAGAgent(
    store,
    "你是一个技术助手，请基于提供的文档内容准确回答问题，用中文简洁作答。",
  );

  // 测试 1：TypeScript 类型问题
  console.log("=== 提问 1: TypeScript 的 interface 和 type 有什么区别？===");
  const answer1 = await agent.chat(
    "TypeScript 的 interface 和 type 有什么区别？",
  );
  console.log(`Agent: ${answer1}\n`);

  // 测试 2：Agent 相关问题
  console.log("=== 提问 2: Agent 的上下文窗口满了怎么办？===");
  const answer2 = await agent.chat("Agent 的上下文窗口满了怎么办？");
  console.log(`Agent: ${answer2}\n`);

  // 测试 3：RAG 本身的问题
  console.log("=== 提问 3: 常见的向量数据库有哪些？===");
  const answer3 = await agent.chat("常见的向量数据库有哪些？");
  console.log(`Agent: ${answer3}\n`);
}

main().catch(console.error);
