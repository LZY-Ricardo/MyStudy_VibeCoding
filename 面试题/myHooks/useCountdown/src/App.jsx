import React from 'react'
import useCountdown from './useCountdown.jsx';

export default function App() {
    // 使用自定义Hook，设置10分钟倒计时和结束回调
    const { hours, minutes, seconds } = useCountdown(10 * 60 * 1000, () => {
        alert('倒计时结束！');
    })

    return (
        <div>
            <h1>倒计时</h1>
            <div>
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>
        </div>
    )
}
