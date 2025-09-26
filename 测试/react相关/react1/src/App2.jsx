import React, { useState } from 'react'

export default function App2() {
    const [count, setCount] = useState(0)
    if (count < 2) {
        var [count2, setCount2] = useState(222)
    }

  return (
      <div>
          <div onClick={() => setCount(count + 1)}>{count}</div>
          <div>{count2}</div>
    </div>
  )
}
