import React from 'react'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  setCount(count + 1)
  console.log('第一次' + count);

  setCount(count + 1)
  console.log('第二次' + count);
  return (
    <div>
      <h1>当前计数：{count}</h1>
    </div>
  )
}
