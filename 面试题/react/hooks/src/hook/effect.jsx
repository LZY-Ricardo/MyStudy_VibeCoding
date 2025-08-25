import React, { useState, useEffect } from 'react'

export default function Effect() {
    const [temp, setTemp] = useState(20)
    const [suggest, setSuggest] = useState('长袖')
    const add = () => {
        setTemp(temp + 5)
    }
    useEffect(() => {
        if (temp > 30) {
            setSuggest('短袖')
        }
    }, [temp])
  return (
    <div>
        <button onClick={add}>增加</button>
        <button onClick={() => {setTemp(temp - 1)}}>减少</button>
        <div>当前温度: {temp}℃</div>
        <div>建议穿衣: {suggest}</div>
    </div>
  )
}
