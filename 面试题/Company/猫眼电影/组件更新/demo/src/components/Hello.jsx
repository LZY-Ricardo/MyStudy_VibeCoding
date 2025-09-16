import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'

const Child = React.memo(({obj, count}) => { // 已经将 child 组件的 vDOM 缓存起来了
    console.log('Child 组件渲染了');
    const doubleAge = obj.age * 2

    const doubleCount = useMemo(() => {
        return count * 2
    }, [count])
    return (
        <div>
            <h2>Child 组件</h2>
            <div>
                姓名: {obj.name}
            </div>
            <div>
                年龄: {doubleAge}
            </div>
            <div>
                计数: {doubleCount}
            </div>
        </div>
    )
})

export default function Hello() {
    const [count, setCount] = useState(0)
    const [obj, setObj] = useState({
        name: '张三',
        age: 18
    })
    let obj2 = useRef({
        name: '张三',
        age: 18
    })

    useEffect(() => {
        setTimeout(() => {
            setCount(count + 1)
        }, 1000)
    },)
  return (
    <div>
      <h1>Hello</h1>
          <div onClick={() => setCount(count + 1)}>当前计数: {count}</div>
            <Child obj={obj2.current} count={count} />
      </div>
  )
}
