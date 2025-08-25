import React, { useEffect, useState, memo, useMemo, useCallback } from 'react'

const Child = memo(function({ count, cb }) {
    console.log('child render');
    return (
        <div>
            <h2>{ count }</h2>
        </div>
    )
})

export default function Memo() {
    const [n, setN] = useState(0)
    const [count, setCount] = useState(2)

    useEffect(() => {
        setInterval(() => {
            setN(Math.random())
        }, 2000);
    }, [])
    const cb = useCallback(() => {

    }, [])

    const count2 = useMemo(() => {
        return count * 10
    }, [count])
  return (
    <div>
        <h1>当前随机数: {n}</h1>
        <Child count={count2} cb={cb} />
    </div>
  )
}
