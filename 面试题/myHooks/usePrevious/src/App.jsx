import { useState } from 'react'
import usePrevious from './usePrevious.jsx'

export default function App() {
    const [count, setCount] = useState(0)
    let preCount = usePrevious(count)
  return (
      <div>
          <h1>当前计数: {count}</h1>
          <button onClick={() => setCount(count + 1)}>增加</button>
          <h1>上一次计数: {preCount}</h1>
    </div>
  )
}
