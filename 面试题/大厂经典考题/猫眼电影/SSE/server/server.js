// BFF 中间层
import express from 'express'
import { config } from 'dotenv'
config({
    path: ['.env.local', '.env']
})

const openaiApiKey = process.env.VITE_DEEPSEEK_API_KEY
const app = express()
const port = 3000
const endpoint = 'https://api.deepseek.com/chat/completions';


app.get('/stream', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')  // 保持连接
    res.flushHeaders() // 发送初始响应头

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: '你是一个说书先生, 说的故事常常引人入胜, 动人心弦' },
                    { role: 'user', content: req.query.question }],
                stream: true
            })
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false
        let buffer = ''
        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = buffer + decoder.decode(value)
            buffer = ''

            const lines = chunkValue.split('\n').filter(line => line.startsWith('data: '))

            for (const line of lines) {
                const incoming = line.slice(6)
                if (incoming === '[DONE]') {
                    done = true
                    break
                }
                const data = JSON.parse(incoming)
                const delta = data.choices[0].delta.content // 一滴水的样子
                if (delta) {
                    res.write(`data: ${delta}\n\n`)  // 发送给前端
                }
            }
        }
        res.write('event: end\n')  // 发送结束事件
        res.write('data: [DONE]\n\n')  // 通知客户端数据流结束
        res.end()  // 结束响应
    } catch (error) {
        res.write('event: error\n')  // 发送错误事件
        res.write(`data: ${error.message}\n\n`)  // 发送错误信息
        res.end()  // 结束响应
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})