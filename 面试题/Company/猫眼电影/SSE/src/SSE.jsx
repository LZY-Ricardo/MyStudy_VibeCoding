import React, { useState } from 'react'

export default function App() {
    const [content, setContent] = useState('')
    const [question, setQuestion] = useState('讲一下龟兔赛跑的故事')
    const [streaming, setStreaming] = useState(false)

    const update = async () => {
        if (!question) return
        setContent('思考中...')

        const endpoint = '/api/stream'
        if (streaming) {
            setContent('')
            const eventSource = new EventSource(`${endpoint}?question=${question}`)
            eventSource.addEventListener('message', (e) => {
                // 后端每发送一次数据, 就会触发一次 message 事件
                console.log(e.data);
                setContent(prev => prev + e.data)
            })
            eventSource.addEventListener('end', () => {
                eventSource.close()
            })
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