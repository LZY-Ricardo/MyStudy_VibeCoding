import React, { useEffect, useState } from 'react'
import useMountedState from './hooks/useMountedState'

const Child = React.memo(function({ isMounted }) {
    return (
        <div>
            <h1>Child</h1>
            {isMounted() ? 'mounted' : 'pending'}
        </div>
    )
})

export default function App() {
    const isMounted = useMountedState()
    const [, setNum] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setNum(null)
        }, 2000)
    }, [])
  return (
    <div>
        {isMounted() ? 'mounted' : 'pending'}
        <Child isMounted={isMounted}/>
    </div>
  )
}
