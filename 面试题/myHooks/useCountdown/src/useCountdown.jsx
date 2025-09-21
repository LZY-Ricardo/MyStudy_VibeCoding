import { useState, useRef, useEffect } from "react"

function useCountdown(initialTime, callback) {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const timeRef = useRef(initialTime)
    const timerRef = useRef(null)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            timeRef.current -= 1000
            setTime(formatTime(timeRef.current))
            if (timeRef.current <= 0) {
                clearInterval(timerRef.current)
                callback()
            }
        }, 1000);
        
        return () => {
            clearInterval(timerRef.current)
        }
    }, [initialTime, callback])
    
    return time
}

function formatTime(ms) {
    const hours = Math.floor(ms / (60 * 60 * 1000))
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((ms % (60 * 1000)) / 1000)
    return {
        hours,
        minutes,
        seconds
    }
}

export default useCountdown