import React, { useState } from 'react'
import useInterval from './useInterval'

export default function App() {
    const [count, setCount] = useState(0) // 定时器当前数值
    const [running, setRunning] = useState(true) // 控制定时器是否运行

    useInterval(() => {
        setCount(prev => prev + 1) // 每次定时器触发，将当前数值加 1
        return count + 1
    },
        running ? 1000 : null // 当定时器运行时，设置定时器间隔为 1000 毫秒
    )

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setRunning(!running)}>{running ? 'pause' : 'start'}</button>
            <button onClick={() => setCount(0)}>reset</button>
        </div>
    )
}
