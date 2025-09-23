import React from 'react'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    // setCount(prev => prev + 1)
    // setCount(prev => prev + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  // setCount(count + 1)
  // console.log('第一次' + count);

  // setCount(count + 1)
  // console.log('第二次' + count);
  return (
    <div>
      <h1 onClick={handleClick}>当前计数：{count}</h1>
    </div>
  )
}
