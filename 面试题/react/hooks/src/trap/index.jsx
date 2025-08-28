import React, { useEffect, useState } from 'react'

export default function Index() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // 引入 count ===> let _count = count
        // 销毁 闭包保留引用的 _count
        setInterval(() => {
            setCount(count + 1) // 参数中使用的是闭包中的count 修改改的是全局的 count，并不是闭包保留的 _count
        }, 1000);
        // const timer = setInterval(() => {
        //     setCount(prevCount => {
        //         console.log(prevCount);
        //         return prevCount + 1
        //     })
        // }, 1000);
        // return () => {
        //     clearInterval(timer)
        // }
    }, [])

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         console.log(count);
    //         setCount(count + 1)
    //     }, 1000);
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, [count])
    return (
        <div>count: {count}</div>
    )
}
