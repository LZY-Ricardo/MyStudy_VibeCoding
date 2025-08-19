import React from 'react'
import { useEffect } from 'react'

export default function App() {
    useEffect(() => {
        fetch('/api').then(res => res.json()).then(data => {
            console.log(data)
        })
    })
  return (
    <div>App</div>
  )
}
