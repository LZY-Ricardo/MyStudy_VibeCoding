'use client'

import { useEffect, useState } from 'react';

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Page() {

    const [list, setList] = useState([]);

    const fetchData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = (await res.json()).slice(0, getRandomInt(1, 10))
        setList(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <ul>
                {list.map(({ title, id }) => {
                    return <li key={id}>{title}</li>
                })}
            </ul>
            <button onClick={() => {
                location.reload()
            }}>换一批</button>
        </>
    )
}