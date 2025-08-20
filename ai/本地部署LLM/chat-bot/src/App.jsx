import React, { useRef, useState } from 'react'
import './App.css'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'  
import remarkGfm from 'remark-gfm'

export default function App() {
  const inputRef = useRef(null)
  const [list, setList] = useState([])

  const send = () => {
    const value = inputRef.current.value
    if (!value) {
      return
    }
      setList(prev => [...prev, {
        role: 'user',
        content: value
      }])
    axios.post('http://localhost:3000/chat', {
      role: 'user',
      content: value
    }).then(res => {
      console.log(res.data.data)
      const content = res.data.data.split('>')[2]
      console.log(content);

      setList(prev => [...prev, {
        role: 'bot',
        content: content
      }])
      inputRef.current.value = ''
    })
  }
  return (
    <div className='container'>
      <div className='header'>
        <h1>Chat Bot</h1>
      </div>
      <div className='content'>

        <div className="bot">
          AI：<span>您好!我是您的AI智能助手,可以帮您解答问题,编写代码,进行创作等。请问有什么我可以帮助您的吗？</span>
        </div>

        <div className='chat'>
          {
            list.map((item, index) => (
              <div key={index}>
                {
                  item.role === 'user' ? (
                    <div className='user question item'>
                      me:
                      <span>{item.content}</span>
                    </div>
                  ) : (
                    <div className='bot answer item'>
                      AI:
                      <span
                      >
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw]}
                          remarkPlugins={[remarkGfm]}
                        >
                          {item.content}
                        </ReactMarkdown>
                      </span>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>

      </div>

      <div className="input">
        <input ref={inputRef} type="text" placeholder="请输入" />
        <button onClick={send}>发送</button>
      </div>
    </div>
  )
}
