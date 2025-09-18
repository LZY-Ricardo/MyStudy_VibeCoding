import React, { useState, useRef, useEffect } from 'react'

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    }, [value])
    return ref.current
}

export default function App2() {
    const [count, setCount] = useState(0)
    const preCount = usePrevious(count)
    const add = () => {
        setCount(count + 1)
        console.log('preCount', preCount);
    }
  return (
      <div>
          <h2>当前计数: {count}</h2>
          <h2>上一次计数: {preCount}</h2> 
          <button onClick={add}>增加</button>
    </div>
  )
}
