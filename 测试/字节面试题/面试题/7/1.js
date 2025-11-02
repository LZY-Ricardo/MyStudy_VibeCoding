// 手写一个 Autocomplete 组件
// 一个input框 输入关键字 下面会出现相匹配的选项
// 假如数据是发请求向后端请求来的
// 假如数据有十几万条
// 假如匹配项也有好几十万条

import React, { useState, useRef, useCallback } from 'react';

/**
 * 简约版 Autocomplete 组件
 * 核心优化：
 * 1. 防抖 - 减少请求频率
 * 2. 虚拟滚动 - 只渲染可见项，处理大量数据
 */
const ITEM_HEIGHT = 40; // 每项高度
const VISIBLE_COUNT = 10; // 可见项数

export default function Autocomplete({ fetchData, onSelect }) {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const timerRef = useRef(null);
    const containerRef = useRef(null);

    // 防抖搜索
    const handleSearch = useCallback(async (value) => {
        if (!value.trim()) {
            setResults([]);
            return;
        }

        // 清除之前的定时器
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // 防抖：300ms 后执行
        timerRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await fetchData(value);
                setResults(data);
            } catch (error) {
                console.error('搜索失败:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    }, [fetchData]);

    // 处理输入
    const handleInputChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        handleSearch(value);
    };

    // 虚拟滚动计算
    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2);
    const endIndex = Math.min(results.length, startIndex + VISIBLE_COUNT + 4);
    const visibleData = results.slice(startIndex, endIndex);
    const totalHeight = results.length * ITEM_HEIGHT;
    const offsetY = startIndex * ITEM_HEIGHT;

    // 滚动处理
    const handleScroll = () => {
        if (containerRef.current) {
            setScrollTop(containerRef.current.scrollTop);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* 输入框 */}
            <input
                type="text"
                value={keyword}
                onChange={handleInputChange}
                placeholder="请输入关键字..."
                style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}
            />

            {/* 加载提示 */}
            {loading && <div style={{ padding: '8px' }}>搜索中...</div>}

            {/* 下拉列表 - 虚拟滚动 */}
            {results.length > 0 && !loading && (
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        maxHeight: `${VISIBLE_COUNT * ITEM_HEIGHT}px`,
                        overflow: 'auto',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* 占位元素撑起总高度 */}
                    <div style={{ height: totalHeight, position: 'relative' }}>
                        {/* 实际渲染的可见项 */}
                        <div style={{ transform: `translateY(${offsetY}px)` }}>
                            {visibleData.map((item, index) => {
                                const actualIndex = startIndex + index;
                                return (
                                    <div
                                        key={actualIndex}
                                        onClick={() => {
                                            setKeyword(item.label || item.value || item);
                                            setResults([]);
                                            onSelect?.(item);
                                        }}
                                        style={{
                                            height: `${ITEM_HEIGHT}px`,
                                            padding: '8px',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                    >
                                        {item.label || item.value || item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 使用示例：
// const fetchData = async (keyword) => {
//   const res = await fetch(`/api/search?q=${keyword}`);
//   return res.json();
// };
// <Autocomplete fetchData={fetchData} onSelect={(item) => console.log(item)} />