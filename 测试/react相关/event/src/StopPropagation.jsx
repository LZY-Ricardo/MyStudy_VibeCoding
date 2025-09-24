import { useRef, useEffect } from 'react';

export default function StopPropagation() {
    const parentRef = useRef(null);
    const childRef = useRef(null);

    // 父元素原生事件
    const handleParentClick = () => {
        console.log('父元素原生事件触发');
    };

    // 子元素原生事件
    const handleChildClick = (e) => {
        // e.stopPropagation(); // 阻止原生事件冒泡
        console.log('子元素原生事件触发');
    };

    // 父元素事件处理函数
    const handleParent = (e) => {
        console.log('父元素事件处理函数触发');
    };

    // 子元素事件处理函数
    const handleChild = (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        console.log('子元素事件处理函数触发');
    };

    useEffect(() => {
        const parent = parentRef.current;
        const child = childRef.current;

        if (parent) parent.addEventListener('click', handleParentClick);
        if (child) child.addEventListener('click', handleChildClick);

        return () => {
            if (parent) parent.removeEventListener('click', handleParentClick);
            if (child) child.removeEventListener('click', handleChildClick);
        };
    }, []);

    return (
        <div ref={parentRef} style={{ padding: '20px', border: '1px solid #000' }} onClick={handleParent}>
            父元素
            <button ref={childRef} style={{ marginLeft: '10px' }} onClick={handleChild}>
                子按钮（点击不会触发父元素事件）
            </button>
        </div>
    );
}