import React, { useEffect, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return state + action.num
        default:
            return state
    }
}

export default function Index() {
    const [count, dispatch] = useReducer(reducer, 0)

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({type: 'add', num: 1})
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <div>count: {count}</div>
    )
}
