import React, { useState } from 'react'
import useMountedState from './useMountedState'

export default function App() {
    const [count, setCount] = useState(0)

    const get = useMountedState()
    console.log(get());
    
  return (
    <div onClick={() => setCount(count + 1)}>{count}</div>
  )
}
