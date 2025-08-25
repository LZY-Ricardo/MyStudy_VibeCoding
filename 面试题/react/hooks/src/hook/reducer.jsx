import React, { useReducer } from 'react'

export default function Reducer() {
    const [res, dispatch] = useReducer(reducer, { result: 20, suggest: '长袖' } )
    function reducer(state, action) {
        switch (action.type) {
            case 'add':
                const obj = {
                    result: state.result + 5,
                    suggest: state.result + 5 > 30 ? '短袖' : '长袖'
                }
                return obj
            case 'minus':
                const obj2 = {
                    result: state.result - 5,
                    suggest: state.result - 5 <= 20 ? '长袖' : '短袖'
                }
                return obj2
            default:
                return state
        } 
    }
  return (
    <div>
        <button onClick={() => dispatch({type: 'add'})}>增加</button>
        <button onClick={() => dispatch({type: 'minus'})}>减少</button>
        <div>当前温度: {res.result}℃</div>
        <div>当前建议: {res.suggest}</div>
    </div>
  )
}
