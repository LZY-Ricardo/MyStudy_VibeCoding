import React, { useState } from 'react'
import { useEffect } from 'react'

const getData = async () => {
    const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100)
        }, 1000)
    })
    return res
}

export default function Count(props) {
    // useState 里面如果放回调函数里面是同步代码和直接放一个数值一样 会被fiber节点缓存住 
    // 但如果 回调函数里面 是异步代码 那么每次组件刷新 都会执行一次 异步代码
    const [count, setCount] = useState(() => {
        // const res = await getData()
        // console.log(res);
        // return res
        return props.val
    })

    console.log('函数渲染');
    

    useEffect(() => {
        console.log('useEffect');
        // getData().then(res => {
        //     setCount(res)
        // })

        return () => {
            console.log('组件卸载了');
            setCount(0)
        }
    }, [count])

    console.log('render');
    
    return (
        <div>
            <h1>函数组件当前计数：{count}</h1>
            <button onClick={() => setCount(count + 1)}>增加</button>
        </div>
    )
}
