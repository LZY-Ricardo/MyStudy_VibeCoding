import React, { useEffect, useState, useRef, useCallback } from 'react';
import './app2.css';

// 模拟聊天数据（写死的30条不同长度的聊天信息）
const generateChatData = () => {
    const chatMessages = [
        { id: 0, content: '你好！', isMe: true },
        { id: 1, content: '嗨，最近怎么样？', isMe: false },
        { id: 2, content: '还不错，工作挺忙的，你呢？', isMe: true },
        { id: 3, content: '我也是，最近在学习新的技术栈', isMe: false },
        { id: 4, content: '哦，什么技术？React吗？', isMe: true },
        { id: 5, content: '是的，还有TypeScript和一些前端工程化的东西，感觉挺有意思的', isMe: false },
        { id: 6, content: '确实，前端发展很快', isMe: true },
        { id: 7, content: '对啊，每天都有新东西出来，有时候感觉学不完', isMe: false },
        { id: 8, content: '哈哈，我也有这种感觉，不过慢慢来吧', isMe: true },
        { id: 9, content: '嗯嗯', isMe: false },
        { id: 10, content: '对了，你最近有什么好的学习资源推荐吗？', isMe: true },
        { id: 11, content: '有啊，我觉得官方文档是最好的学习资源，还有一些技术博客也不错', isMe: false },
        { id: 12, content: '能具体推荐几个吗？', isMe: true },
        { id: 13, content: 'MDN、React官网、阮一峰的博客、掘金上也有很多优质文章', isMe: false },
        { id: 14, content: '谢谢！我去看看', isMe: true },
        { id: 15, content: '不客气，一起学习进步', isMe: false },
        { id: 16, content: '对了，你们公司用什么技术栈？', isMe: true },
        { id: 17, content: '主要是React + TypeScript + Node.js，后端用的是Express和MongoDB', isMe: false },
        { id: 18, content: '听起来很现代化', isMe: true },
        { id: 19, content: '是的，团队比较注重技术更新', isMe: false },
        { id: 20, content: '那开发效率应该挺高的', isMe: true },
        { id: 21, content: '确实，工具链比较完善，CI/CD也做得不错', isMe: false },
        { id: 22, content: '羡慕啊', isMe: true },
        { id: 23, content: '你们公司呢？', isMe: false },
        { id: 24, content: '我们还在用比较传统的技术，正在考虑升级', isMe: true },
        { id: 25, content: '升级确实需要时间，不过值得投入', isMe: false },
        { id: 26, content: '嗯，我也这么觉得', isMe: true },
        { id: 27, content: '好了，我先去忙了，改天再聊', isMe: false },
        { id: 28, content: '好的，拜拜！', isMe: true },
        { id: 29, content: '拜拜！', isMe: false },
        { id: 30, content: '等等，还有个问题想问你', isMe: true },
        { id: 31, content: '什么问题？', isMe: false },
        { id: 32, content: '关于虚拟列表的实现，你有什么好的建议吗？', isMe: true },
        { id: 33, content: '虚拟列表主要是为了解决大量数据渲染的性能问题，核心思路是只渲染可见区域的元素', isMe: false },
        { id: 34, content: '嗯，我现在就在做这个', isMe: true },
        { id: 35, content: '那你遇到什么困难了吗？', isMe: false },
        { id: 36, content: '主要是高度计算和滚动优化比较复杂', isMe: true },
        { id: 37, content: '确实，动态高度的虚拟列表是比较有挑战性的，需要做好高度缓存和可见区域计算', isMe: false },
        { id: 38, content: '你有推荐的库吗？', isMe: true },
        { id: 39, content: 'react-window和react-virtualized都不错，不过自己实现也能学到更多', isMe: false },
        { id: 40, content: '我想自己实现一遍，加深理解', isMe: true },
        { id: 41, content: '很好的想法！实现过程中要注意防抖、缓冲区设置和内存管理', isMe: false },
        { id: 42, content: '缓冲区是什么意思？', isMe: true },
        { id: 43, content: '就是在可见区域上下多渲染一些元素，这样滚动时不会出现空白', isMe: false },
        { id: 44, content: '原来如此，这样用户体验会更好', isMe: true },
        { id: 45, content: '对的，还要注意滚动事件的性能优化，避免频繁重新计算', isMe: false },
        { id: 46, content: '我现在用的是防抖，还有其他方法吗？', isMe: true },
        { id: 47, content: '可以结合requestAnimationFrame，或者使用Intersection Observer API', isMe: false },
        { id: 48, content: '听起来很高级，我去研究一下', isMe: true },
        { id: 49, content: '加油！有问题随时交流', isMe: false },
        { id: 50, content: '好的，谢谢你的建议', isMe: true },
        { id: 51, content: '不客气，互相学习', isMe: false },
        { id: 52, content: '对了，你们项目中有用到虚拟列表吗？', isMe: true },
        { id: 53, content: '有的，主要用在数据表格和长列表展示上，效果很明显', isMe: false },
        { id: 54, content: '能提升多少性能？', isMe: true },
        { id: 55, content: '从渲染几千个DOM节点减少到只渲染几十个，性能提升是质的飞跃', isMe: false },
        { id: 56, content: '太厉害了！', isMe: true },
        { id: 57, content: '是的，特别是在移动端，效果更加明显', isMe: false },
        { id: 58, content: '我一定要把这个技术掌握好', isMe: true },
        { id: 59, content: '相信你可以的，实践是最好的老师', isMe: false }
    ];
    return chatMessages;
};

const ChatVirtualList = () => {
    const chatList = generateChatData();
    const containerRef = useRef(null); // 滚动容器
    const [scrollTop, setScrollTop] = useState(0); // 滚动位置
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 30 }); // 可见元素范围，初始显示更多内容
    const [, forceUpdate] = useState({}); // 强制更新触发器
    const scrollTimeoutRef = useRef(null); // 滚动防抖定时器

    // 1. 高度缓存：使用 useRef 存储每个元素的实际高度，避免触发重渲染
    const heightMapRef = useRef(
        chatList.reduce((map, item) => {
            map[item.id] = 80; // 预估高度（可根据业务调整）
            return map;
        }, {})
    );

    // 2. 计算从0到index的累计高度（用于定位滚动位置）
    const getTotalHeight = useCallback((index) => {
        let total = 0;
        for (let i = 0; i <= index; i++) {
            total += heightMapRef.current[chatList[i]?.id] || 80; // 用缓存高度，默认预估高度
        }
        return total;
    }, [chatList]);

    // 3. 根据滚动距离找到起始索引（二分查找优化性能）
    const findStartIndex = useCallback((scrollTop) => {
        if (scrollTop <= 0) return 0;
        if (chatList.length === 0) return 0;
        
        let low = 0;
        let high = chatList.length - 1;
        let result = 0;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midHeight = mid === 0 ? 0 : getTotalHeight(mid - 1); // 修复边界情况
            const nextHeight = getTotalHeight(mid); // 当前元素结束位置的高度
            
            if (scrollTop >= nextHeight) {
                result = mid + 1; // 滚动位置超过当前元素，起始索引应该是下一个
                low = mid + 1;
            } else if (scrollTop >= midHeight) {
                result = mid; // 滚动位置在当前元素范围内
                break;
            } else {
                high = mid - 1;
            }
        }
        
        return Math.min(result, chatList.length - 1);
    }, [getTotalHeight, chatList.length]);

    // 4. 测量元素实际高度并更新缓存（优化批量更新）
    const measureItemHeight = useCallback((id, ref) => {
        if (ref) {
            const actualHeight = ref.offsetHeight;
            // 只有当实际高度与缓存差异较大时才更新（减少微小差异导致的闪动）
            const cachedHeight = heightMapRef.current[id] || 80;
            if (Math.abs(actualHeight - cachedHeight) > 5) { // 增加阈值，减少频繁更新
                heightMapRef.current[id] = actualHeight;
                // 移除强制更新，避免滚动回弹
                // 高度变化会在下次滚动时自然更新可见范围
            }
        }
    }, []);

    // 5. 核心滚动计算逻辑
    const updateVisibleRange = useCallback((scrollTop) => {
        if (!containerRef.current) return;
        const { clientHeight } = containerRef.current;

        // 计算可见区域的起始索引，添加上缓冲区
        const bufferSize = Math.max(5, Math.floor(clientHeight / 80)); // 适当减少缓冲区避免计算错误
        const rawStart = findStartIndex(scrollTop);
        const start = Math.max(0, rawStart - bufferSize);
        
        // 修复结束索引计算：基于可见高度计算需要渲染的项目数量
        const visibleItemCount = Math.ceil(clientHeight / 80); // 可见区域大概能显示多少项
        const rawEnd = Math.min(chatList.length, rawStart + visibleItemCount + bufferSize);
        const end = Math.min(chatList.length, rawEnd);
        
        // 确保索引范围有效
        if (start >= chatList.length || end <= start) {
            return;
        }
        
        // 只有当可见范围变化较大时才更新，避免频繁重渲染和回弹
        setVisibleRange(prev => {
            // 采用适中的更新策略，平衡性能和用户体验
            const startDiff = Math.abs(start - prev.start);
            const endDiff = Math.abs(end - prev.end);
            // 当任一边界变化超过阈值时更新，但阈值适当增大
            if (startDiff >= 4 || endDiff >= 4) {
                return { start, end };
            }
            return prev;
        });
    }, [findStartIndex, chatList.length]);

    // 6. 处理滚动事件（使用requestAnimationFrame优化）
    const handleScroll = useCallback((e) => {
        if (!containerRef.current) return;
        const currentTop = e?.target?.scrollTop || containerRef.current.scrollTop;
        setScrollTop(currentTop);
        
        // 清除之前的动画帧请求
        if (scrollTimeoutRef.current) {
            cancelAnimationFrame(scrollTimeoutRef.current);
        }
        
        // 使用requestAnimationFrame确保与浏览器渲染同步，避免回弹
        scrollTimeoutRef.current = requestAnimationFrame(() => {
            updateVisibleRange(currentTop);
        });
    }, [updateVisibleRange]);

    // 7. 计算列表偏移量（让可见元素定位到正确位置）
    const getOffsetStyle = useCallback(() => {
        const offsetY = getTotalHeight(visibleRange.start - 1); // 起始元素之前的累计高度
        return {
            transform: `translateY(${offsetY}px)`,
        };
    }, [getTotalHeight, visibleRange.start]);

    // 8. 总列表高度（用于撑开滚动容器）
    const getTotalListHeight = useCallback(() => {
        return chatList.reduce((total, item) => {
            return total + (heightMapRef.current[item.id] || 80);
        }, 0);
    }, [chatList]);
    
    const totalListHeight = getTotalListHeight();

    // 初始渲染时设置可见范围
    useEffect(() => {
        const timer = setTimeout(() => {
            if (containerRef.current && chatList.length > 0) {
                const { clientHeight } = containerRef.current;
                // 计算初始应该显示多少条消息
                const visibleItemCount = Math.ceil(clientHeight / 80);
                const bufferSize = Math.max(5, Math.floor(clientHeight / 80));
                const initialEnd = Math.min(chatList.length, visibleItemCount + bufferSize);
                
                // 设置初始可见范围
                setVisibleRange({ start: 0, end: initialEnd });
            }
        }, 50); // 减少延迟提高响应性
        return () => clearTimeout(timer);
    }, [chatList.length]);

    // 组件卸载时清理动画帧请求
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                cancelAnimationFrame(scrollTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="chat-container"
            ref={containerRef}
            onScroll={handleScroll}
        >
            {/* 占位容器，用于撑开滚动高度 */}
            <div className="list-placeholder" style={{ height: totalListHeight }} />

            {/* 可见元素容器 */}
            <div className="visible-list" style={getOffsetStyle()}>
                {chatList.slice(visibleRange.start, visibleRange.end).map((item) => (
                    <div
                        key={item.id}
                        ref={(ref) => measureItemHeight(item.id, ref)} // 测量实际高度
                        className={`message-item ${item.isMe ? 'me' : 'other'}`}
                    >
                        <div className="message-bubble">{item.content}</div>
                    </div>
                ))}
            </div>
            

        </div>
    );
};

export default ChatVirtualList;
