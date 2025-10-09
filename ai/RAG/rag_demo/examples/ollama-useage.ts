import ollama from 'ollama';

async function main() {
    const res = await ollama.embeddings({
        model: 'nomic-embed-text',
        prompt: 'RAG 是什么？',
    });

    console.log(res);  // 向量数组
}

main()