import React, { useState } from 'react'

export default function App3() {
    // const [count, setCount] = useState(() => {
    //     console.log('初始化计数');
    //     setTimeout(() => {
    //         console.log('初始化计数完成');
    //     }, 1000)  
    //     return 0
    // })
    const [count, setCount] = useState(initCount())
    function initCount() {
        console.log('初始化计数');
        setTimeout(() => {
            console.log('初始化计数完成');
        }, 1000)  
        return 0
    }
  return (
      <div>
          <h1>当前计数：{count}</h1>
          <button onClick={() => setCount(count + 1)}>增加</button>
      </div>
  )
}
