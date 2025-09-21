import React, { useEffect, useState, useCallback, useMemo } from 'react'

export default function SearchInput({ request }) {
    const [show, setShow] = useState([])
    const [data, setData] = useState([]) // 使用状态变量而不是普通变量
    
    // 搜索处理函数
    const handleSearch = useCallback(async (e) => {
        const value = e.target.value
        try {
            const result = await request(value)
            setData(result) // 直接更新状态，触发重新渲染
        } catch (error) {
            console.error('搜索请求失败:', error)
            setData([]) // 出错时清空数据
        }
    }, [request])
    
    // 当数据更新时，同步更新显示列表
    useEffect(() => {
        setShow(data)
    }, [data])
    
    // 防抖函数 - 使用 useMemo 避免每次渲染都创建新函数
    const debounce = useMemo(() => {
        return (fn, delay) => {
            let timer = null
            return function (...args) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    fn.apply(this, args)
                }, delay)
            }
        }
    }, [])
    
    // 防抖搜索函数 - 使用 useMemo 保持引用稳定
    const handleSearchDebounce = useMemo(() => 
        debounce(handleSearch, 500), 
        [debounce, handleSearch]
    )
    
    return (
        <div>
            <input 
                type="text" 
                placeholder="请输入搜索内容..." 
                onChange={handleSearchDebounce}
            />
            <div>
                {show.map((item, index) => (
                    <div key={`${item}-${index}`}>{item}</div>
                ))}
            </div>
        </div>
    )
}
