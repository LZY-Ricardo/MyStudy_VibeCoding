import path from 'node:path';
import { LocalIndex } from 'vectra'
import { getEmbeddings, getVector } from './utils/index.ts'

export class SimpleRag {
    private db: LocalIndex | undefined;
    private indexPath: string;

    constructor(indexPath: string = '.vectra') {
        this.indexPath = path.join(__dirname, '..', indexPath)
    }

    get avaliable() {
        return this.db !== undefined
    }

    async initalize() {
        const index = new LocalIndex(this.indexPath)  // 向量索引
        if (!(await index.isIndexCreated())) {
            await index.createIndex()
        }
        this.db = index
    }

    async add(text) {
        if (!this.avaliable) throw new Error('RAG not initialized')
        const embeddings = await getEmbeddings(text)
        const res: (Awaited<ReturnType<LocalIndex['insertItem']>> | undefined)[] = []
        for (const embedding of embeddings) {
            res.push(await this.db?.insertItem(embedding))
        }
        return res.filter((item) => item).map(item => ({ id: item!.id }))
    }

    async del(items: { id: string } | { id: string }[]) {
        if (!Array.isArray(items)) items = [items];
        if (!this.avaliable) throw new Error('RAG is not initialized');
        const res: ({ id: string })[] = [];
        for (const item of items) {
            await this.db?.deleteItem(item.id);
            res.push({ id: item.id });
        }
        return res;
    }

    async query(query: string, topK: number = 5) {
        if (!this.avaliable) throw new Error('RAG is not initialized');
        const vector = await getVector(query);
        const result = await this.db?.queryItems(vector, query, topK);
        return result?.map(({ item, score }) => ({ text: item.metadata.text, query, simularity: score, id: item.id, }));
    }

}

