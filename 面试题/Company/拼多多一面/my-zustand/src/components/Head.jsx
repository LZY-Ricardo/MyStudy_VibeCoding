import  useListStore  from '../store/index2'
import { useRef } from 'react'

export default function Head() {
    const { addData } = useListStore((state) => state)  
    const inputRef = useRef(null)
    const add = () => {
        console.log(inputRef.current.value);
        addData(inputRef.current.value)
        inputRef.current.value = ''
    }
  return (
      <div>
          <input type="text" defaultValue={"hello"} ref={inputRef} />
          <button onClick={add}>添加</button>
    </div>
  )
}
