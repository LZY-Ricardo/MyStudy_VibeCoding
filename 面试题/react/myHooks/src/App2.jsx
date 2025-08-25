import React from 'react'
import useHover from './hooks/useHover.js'

export default function App() {
    const element = (hovered) => {
        return (
            <div onMouseEnter={() => console.log('enter')} onMouseLeave={() => console.log('leave')}>
                {hovered ? 'hovered' : 'unhovered'}
            </div>
        )
    }
    const [hovered, setHovered] = useHover(element)
    // console.log(hovered, setHovered);
    
  return (
    <div>
        {hovered}
        <p>{`hovered: ${setHovered}`}</p>
    </div>
  )
}
