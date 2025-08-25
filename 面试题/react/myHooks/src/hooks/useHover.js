import React, { cloneElement, useState } from 'react'

export default function useHover(element) {
    const [state, setState] = useState(false)
    if (typeof element === 'function') {
        element = element(state)
    }    

    const onMouseEnter = (originalEvent) => {
        return () => {
            if (originalEvent) {
                originalEvent()
            }
            setState(true)
        }
    }
    const onMouseLeave = (originalEvent) => {
        return () => {
            if (originalEvent) {
                originalEvent()
            }
            setState(false)
        }
    }

    const el = cloneElement(element, { // 克隆 React元素(虚拟DOM) 并绑定事件
        // 克隆时 将它身上的事件保留
        onMouseEnter: onMouseEnter(element.props.onMouseEnter),
        onMouseLeave: onMouseLeave(element.props.onMouseLeave)
    })
    return [el, state]
}
