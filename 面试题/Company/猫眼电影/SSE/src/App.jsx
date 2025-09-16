import React, { useState } from 'react'

export default function App() {
    const [content, setContent] = useState('')
    const [question, setQuestion] = useState('讲一下龟兔赛跑的故事')
    const [streaming, setStreaming] = useState(false)

    const update = async () => {
        if (!question) return
        setContent('思考中...')

        const endpoint = 'https://api.deepseek.com/chat/completions'
        const headers = {
            'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: '你是一个讲故事的说书先生, 讲的故事应该动人心弦' },
                    { role: 'user', content: question }],
                stream: streaming
            })
        })
        if (streaming) {
            // console.log(response.body.getReader());
            setContent('')
            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let done = false
            while (!done) {
                const { value, done: doneReading } = await reader.read()
                console.log(decoder.decode(value), doneReading);

                done = doneReading
                const chunkValue = '' + decoder.decode(value) // 转换为字符串
                const lines = chunkValue.split('\n').filter(line => line.startsWith('data: '))
                lines.forEach(line => {
                    const data = JSON.parse(line.slice(6)) // 去掉 data: 前缀 并且将字符串转换为对象
                    setContent(prev => prev + data.choices[0].delta.content)
                })
                
                // setContent(prev => prev + chunkValue)
            }

        } else {
            const data = await response.json()
            setContent(data.choices[0].message.content)

        }
    }

    return (
        <div className='container'>
            <div>
                <label>输入：</label>
                <input type="text" defaultValue={question} onChange={(e) => setQuestion(e.target.value)} />
                <button onClick={update}>提交</button>
            </div>

            <div className="output" style={{ minHeight: '300px', width: '500px' }}>
                <div>
                    <label>Streaming</label>
                    <input type="checkbox" onChange={(e) => setStreaming(e.target.checked)} />
                    <div>{content}</div>
                </div>
            </div>
        </div>
    )
}


// data: { "id": "73cf6856-fb50-4dfb-b660-cf837275bc82", "object": "chat.completion.chunk", "created": 1757575540, "model": "deepseek-chat", "system_fingerprint": "fp_08f168e49b_prod0820_fp8_kvcache", "choices": [{ "index": 0, "delta": { "content": "（" }, "logprobs": null, "finish_reason": null }] }