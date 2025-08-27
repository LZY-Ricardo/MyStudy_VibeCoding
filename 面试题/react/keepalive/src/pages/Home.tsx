import { useEffect, useState } from 'react'

export default function Home() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `当前计数: ${count}`
    }, [count])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>增加</button>
            <button onClick={() => setCount(count - 1)}>减少</button>
        </div>
    )
}
