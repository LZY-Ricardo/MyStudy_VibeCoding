// 手写一个图片懒加载组件
// img 该怎么占位
// src 不写会怎么样

import React, { useRef, useEffect, useState } from 'react';

// 占位图方案：1x1 透明 SVG（最小体积）
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";

// 或者使用带颜色的占位图
// const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3C/svg%3E";

export default function LazyLoad({ src, alt, width, height }) {
    const imgRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(PLACEHOLDER); // 初始使用占位图
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        // 使用 IntersectionObserver 监听图片是否进入可视区域
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 图片进入可视区域，开始加载真实图片
                        setImgSrc(src);
                        observer.unobserve(img);
                    }
                });
            },
            {
                rootMargin: '50px' // 提前50px开始加载
            }
        );

        observer.observe(img);

        return () => {
            observer.disconnect();
        };
    }, [src]);

    return (
        <img
            ref={imgRef}
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setLoaded(true)}
            onError={() => {
                // 加载失败时，可以显示错误占位图
                setImgSrc(PLACEHOLDER);
            }}
            style={{
                backgroundColor: loaded ? 'transparent' : '#f0f0f0',
                transition: 'opacity 0.3s',
                opacity: loaded ? 1 : 0.5
            }}
        />
    );
}

// 使用示例：
// <LazyLoad
//     src="https://example.com/image.jpg"
//     alt="描述"
//     width={200}
//     height={200}
// />