import './index.css'
import { useState } from 'react'

function Deepseek() {
    const [question, setQuestion] = useState('')
    const [content, setContent] = useState('')
    const [isStreaming, setIsStreaming] = useState(false)

    const SubmitEvent = async () => {
        // 获取到用户在input框输入的内容
        if (!question) return
        setContent('思考中...')
        // 跟 deepseek 交互
        const endpoint = 'https://api.deepseek.com/chat/completions'
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: question }],
                stream: isStreaming,
            }),
        })



        // 流式输出
        if (isStreaming) {
            const reader = response.body.getReader() // 读取器
            const decoder = new TextDecoder() // 解码二进制数据
            let done = false
            let buffer = ''

            setContent('') // 清空上一次的内容
            while (!done) {
                let { value, done } = await reader.read() // 读取到二进制数据
                const chunkValue = buffer + decoder.decode(value)
                const lines = chunkValue.split('\n').filter(line => line.startsWith('data: '))
                for (const line of lines) {
                    const incoming = line.slice(6)
                    if (incoming === '[DONE]') {
                        done = true
                        break
                    }
                     
                    try {
                        const data = JSON.parse(incoming)
                        const delta = data.choices[0].delta.content // 一小节中文
                        if (delta) {

                                setContent(prev => prev + delta)

                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } else {
            // 非流式输出
            const data = await response.json()
            setContent(data.choices[0].message.content)
        }

    }

    return (
        <div className="container">
            <div>
                <label>请输入:</label>
                <input type="text" className="input" onChange={(e) => setQuestion(e.target.value)} />
                <button onClick={SubmitEvent}>发送</button>
            </div>
            <div className="response">
                <div>
                    <label>streaming</label>
                    <input type="checkbox" onChange={e => setIsStreaming(e.target.checked)} />
                </div>
                <div className='response-content'>{content}</div>
            </div>
        </div>
    )
}
export default Deepseek