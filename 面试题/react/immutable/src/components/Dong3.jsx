import React, { useState, useEffect } from 'react'
import { fromJS } from 'immutable'

// const immutableObj = fromJS({
//     a: {
//         b: 1
//     }
// })
// const newObj = immutableObj.get('a').set('b', 2)
// console.log(newObj === immutableObj.get('a')); // false
// const newObj = immutableObj.setIn(['a', 'b'], 2)
// console.log(newObj);

export default function Dong3() {
    const [state, setState] = useState(fromJS({
        a: {
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5,
        },
    }))
    useEffect(() => {
        setTimeout(() => {
            console.log(111);
            
            // state.a.b = 2
            // setState(state) // 如果一个 state 中存在很多键值对, 而我们只需要改变其中一个, 那就会很麻烦
            setState(state.setIn(['a', 'b'], 2))
        }, 2000)
    }, [])
    console.log('render3');
    return (
        <div>我是Dong3组件, {state.getIn(['a', 'b'])}</div>
    )
}
