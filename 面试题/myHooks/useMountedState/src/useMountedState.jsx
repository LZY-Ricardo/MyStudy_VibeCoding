import { useCallback, useEffect, useRef } from "react"

function useMountedState() {
    const mounted = useRef()

    const get = useCallback(() => { // 用于获取 mounted.current 的值 同时 get 函数也会被缓存
        return mounted.current
    }, [])
    useEffect(() => {
        console.log('组件挂载完成');
        
        mounted.current = true
        return () => {
            console.log('组件已卸载');
            mounted.current = false
        }
    }, [])

    return get
}
export default useMountedState