import { formatTime } from './useCountdown.jsx';
import { useState, useRef, useEffect } from 'react';

function useCountdown1(initialTime, callback, resetKey = 0) {
    // 使用initialTime计算初始状态，而不是固定的0值
    const [time, setTime] = useState(() => formatTime(initialTime))
    const dtime = useRef(initialTime)
    const timer = useRef(null)
    
    useEffect(() => {
        console.log('useEffect - 倒计时重置, resetKey:', resetKey);
        
        // 当initialTime或resetKey变化时，重置倒计时
        dtime.current = initialTime
        setTime(formatTime(initialTime))
        
        // 清除之前的定时器，避免多个定时器同时运行
        if (timer.current) {
            clearInterval(timer.current)
        }
        
        // 启动新的定时器
        timer.current = setInterval(() => {
            dtime.current -= 1000
            setTime(formatTime(dtime.current))
            if (dtime.current <= 0) {
                callback()
                clearInterval(timer.current)
            }
        }, 1000)
        
        return () => {
            clearInterval(timer.current)
            console.log('定时器已清理');
        }
    }, [initialTime, callback, resetKey]) // 添加resetKey到依赖数组

    return time
}

export default useCountdown1