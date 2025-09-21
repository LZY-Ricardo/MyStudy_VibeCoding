import { useEffect, useRef } from "react"

function usePrevious(count) {
    const countRef = useRef('未定义')
    useEffect(() => {
        countRef.current = count
    }, [count])
    return countRef.current
}
export default usePrevious