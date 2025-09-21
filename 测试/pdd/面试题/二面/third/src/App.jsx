import React from 'react'
import SearchInput from './SearchInput.jsx'

export default function App() {
    // 伪请求函数：每次随机生成包含三个数字的数组
    const request = async () => {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
        
        // 生成随机长度的数组（3-10个元素）
        const length = Math.floor(Math.random() * 8) + 3
        
        // 生成数组，每个元素包含三个随机数字
        const data = Array.from({ length }, () => [
            Math.floor(Math.random() * 100),  // 第一个数字：0-99
            Math.floor(Math.random() * 100),  // 第二个数字：0-99
            Math.floor(Math.random() * 100)   // 第三个数字：0-99
        ])
        
        return data
    }
  return (
    <div>
          <SearchInput request={request} />
    </div>
  )
}
