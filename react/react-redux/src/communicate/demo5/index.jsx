import { useSelector, useDispatch } from "react-redux"
import { add, addList } from "../../store/modules/counterStore"
import { useRef } from "react"

export default function index() {
    // 使用数据
    let { count,list } = useSelector((state) => state.counter) 
    const inputRef = useRef(null)
    const dispatch = useDispatch() // 触发器
    // const addCount = () => {
    //     // 调用仓库中的 add 方法
    //     const action = add()
    //     dispatch(action)
    // }
    const handleAddList = async() => {
        if(inputRef.current.value === '') {
            inputRef.current.placeholder = '请输入内容(不能为空)！！！'
            await setTimeout(() => {
                inputRef.current.placeholder = ''
            }, 1000)
            return
        }
        const inputValue = inputRef.current.value
        dispatch(addList(inputValue))
        inputRef.current.value = ''
    }
    return (
        <div>
            {/* <h3>{count}</h3>
            <button onClick={addCount}>+</button> */}

            <input type="text" ref={inputRef}/>
            <button onClick={handleAddList}>添加</button>
            <ul>
                {
                    list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}
