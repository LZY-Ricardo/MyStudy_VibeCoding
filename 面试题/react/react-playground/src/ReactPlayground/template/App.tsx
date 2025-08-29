import './App.css'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello, world!</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}