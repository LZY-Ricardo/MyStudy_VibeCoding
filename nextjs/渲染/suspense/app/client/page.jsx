'use client'

import { useState } from 'react'

console.log('client component')

export default function Page() {
    console.log('client Page')

    const [text, setText] = useState('init text')

    return (
        <button onClick={() => setText('change text')}>
            {text}
        </button>
    )
}