import React, { useState, useRef, useEffect } from 'react'
import type { ReactNode, CSSProperties } from 'react'

interface MyLazyLoadProps {
    className?: string,
    style?: CSSProperties,
    placeholder?: ReactNode,
    offset?: number,
    width?: number,
    height?: number,
    onContentVisible?: () => void,
    children: ReactNode
}

export default function MyLazyLoad(props: MyLazyLoadProps) {
    const { className, style, placeholder, offset = 0, width, height, onContentVisible, children } = props
    const [visible, setVisible] = useState(false)
    const elementObserver = useRef<IntersectionObserver>()
    const containerRef = useRef<HTMLDivElement>(null)
    const styles = {width: `${width}px` || 0, height: `${height}px` || 0, ...style}
    function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
        const [entry] = entries
        const { isIntersecting } = entry
        if (isIntersecting) { // 在可视区域内
            setVisible(true)
            onContentVisible?.()

            const node = containerRef.current
            if (node) {
                elementObserver.current?.unobserve(node) // 取消观察
            }
        }

    }

    useEffect(() => {
        const options = {
            rootMargin: `${offset || 0}px`,
            threshold: 0,
        }
        elementObserver.current = new IntersectionObserver(lazyLoadHandler, options)
        const node = containerRef.current
        if (node) {
            elementObserver.current.observe(node) // 观察上了
        }
    }, [offset])

    return (
        <div 
            className={className} 
            style={styles} 
            ref={containerRef}
        >
            { visible ? children : placeholder }
        </div>
    )
}
