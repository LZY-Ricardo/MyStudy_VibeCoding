import React, { useCallback, useEffect, useState } from 'react'
import useCountdown from './useCountdown1.jsx';

export default function App() {
    const [daoTime, setDaoTime] = useState(60 * 10 * 1000)
    // 添加一个重置标识，用于强制触发Hook重新执行
    const [resetKey, setResetKey] = useState(0)
    
    // 使用自定义Hook，设置10分钟倒计时和结束回调
    const callback = useCallback(() => {
        alert('倒计时结束!')
    }, [])
    const { hours, minutes, seconds } = useCountdown(daoTime, callback, resetKey)

    // 刷新倒计时的处理函数
    const handleRefresh = () => {
        console.log('刷新倒计时按钮被点击');
        // 方案1：使用时间戳确保每次都是不同的值
        setDaoTime(60 * 10 * 1000 + Date.now() % 1000) // 加上毫秒确保唯一性
        // 方案2：同时更新resetKey来强制重置
        setResetKey(prev => prev + 1)
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>倒计时</h1>
            <div style={{ fontSize: '2rem', margin: '20px 0', fontFamily: 'monospace' }}>
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>
            <button 
                onClick={handleRefresh}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                刷新倒计时
            </button>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                当前倒计时: {daoTime}ms (重置次数: {resetKey})
            </div>
        </div>
    )
}
