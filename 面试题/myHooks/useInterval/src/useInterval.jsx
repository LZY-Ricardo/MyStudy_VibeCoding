import { useEffect, useRef } from "react"

function useInterval(callback, delay) {
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         callback()
    //     }, delay);
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, [delay,callback])

    const savedCallback = useRef() // 用于保存最新的回调函数
    const currentNum = useRef() // 用于保存当前定时器的数值

    // 更新回调函数
    useEffect(() => { // 当回调函数发生变化时，更新 savedCallback.current
        console.log('ref');
        savedCallback.current = callback
    }, [callback])

    // 管理定时器
    useEffect(() => { // 当 delay 发生变化时，重新启动或停止定时器
        console.log('useEffect');
        if (delay === null) { // 当 delay 为 null 时，停止定时器
            return 
        }
        const tick = () => savedCallback.current() // 定义 tick 函数，用于调用最新的回调函数

        const timer = setInterval(() => { // 定义定时器，根据 delay 数值触发 tick 函数
            console.log('timer');
            // currentNum.current = tick()
            savedCallback.current()
        }, delay);

        return () => { // 当组件卸载时，清除定时器
            console.log('卸载');
            clearInterval(timer)
        }
    }, [delay])
}

export default useInterval