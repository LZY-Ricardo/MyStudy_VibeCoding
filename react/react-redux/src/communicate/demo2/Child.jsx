import { useRef } from 'react'

export default function Child({ setList }) {
    const inputRef = useRef(null)

    const handler = () => {
        // 将 input 中的值添加到父组件的 list 中
        setList((preList) => {
            return [...preList, inputRef.current.value]
        })
    }

    return (
        <div className="bd">
            <input type="text" ref={inputRef} />
            <button onClick={handler}>确认</button>
        </div>
    )
}