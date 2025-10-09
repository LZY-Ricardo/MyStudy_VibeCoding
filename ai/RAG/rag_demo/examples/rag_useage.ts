import { SimpleRag } from '../src/index.ts';

async function main() {
    const rag = new SimpleRag();
    await rag.initalize();
    const inserted = await rag.add('RAG 技术原理');  // 插入向量 存入的知识
    console.log(JSON.stringify(inserted));

    const res = await rag.query('RAG 是什么？');
    console.log(JSON.stringify(res)); // 如果 是 ‘RAG 技术原理’ 就说明向量检索成功

    const res2 = await rag.query('无关紧要的问题');
    console.log(JSON.stringify(res2));
}

main();
