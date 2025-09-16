import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: '<DeepSeek API Key>'
});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "你是一个专业的助理" },
            { role: "user", content: "请问茅台今天的收盘价格是多少" },
            { role: "assistant", content: "茅台今天的收盘价格是100元" },
            { role: "user", content: "那青岛啤酒呢" },
        ],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
}

main();