/**
 * 工具函数集合
 */
import ollama from 'ollama';

function getEmbedding(text) {  // 将文本转换为向量
    return ollama.embeddings({
        model: 'nomic-embed-text',
        prompt: text,
    })
}

// 读取向量的能力
export async function getVector(text) {
    return (await getEmbedding(text)).embedding
}

// 过长的文本不适合处理成一个向量, 需要切割成多个子文本
function splitText(text: string, chunkSize = 300, overlap = 50) {
    const chunks: string[] = []
    let start = 0
    while (start < text.length) {
        chunks.push(text.slice(start, start + chunkSize))
        start += chunkSize - overlap
    }
    return chunks
}


export async function getEmbeddings(text) {  // 将长文本切割为多个子文本，每个子文本转换为向量
    const chunks = splitText(text)
    const embeddings = await Promise.all(chunks.map(async (chunk) => await getEmbedding(chunk)))
    return embeddings.map((embedding, i) => ({
        vector: embedding.embedding,
        metadata: { text: chunks[i] }
    }))
}