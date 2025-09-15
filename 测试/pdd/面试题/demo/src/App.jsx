import React, { useState, useEffect, useRef } from 'react'

function usePrevious(value) {
    let ref = useRef()

    useEffect(() => { // 异步更新值
        console.log('useEffect', value);
        ref.current = value
        console.log('ref.current', ref.current);
    }, [value])
    console.log('return', ref.current); // 同步先执行
    return ref.current
}

export default function App() {
    const [count, setCount] = useState(1)
    console.log(count);
    
    const prevCount = usePrevious(count)
    console.log(prevCount); // undefined 1
    return (
        <div>
            <h1>当前值：{count}</h1>
            <h1>上一个值：{prevCount}</h1>
        </div>
    )
}
