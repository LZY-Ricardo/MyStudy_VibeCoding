import { useEffect } from 'react';
import { useState, useRef } from 'react'

export default function Num() {
    const [num, setNum] = useState(() => {
        console.log(useState);
        return 1
    })
    console.log('hello');
    const numRef = useRef(num)
    // console.log(numRef.current);
    
    
    const handleAdd = async () => {
        // setNum(num + 1)
        // console.log(num);
    
        // setNum((pre) => {
        //     const newNum = pre + 1
        //     console.log('新值:', newNum);
        //     return newNum
        // })
        setNum(num + 1)
    }

    useEffect(() => {
        console.log('useEffect');
        numRef.current = num
        console.log('numRef.current:', numRef.current);

    }, [num])

    return (
        <div>
            <div>numRef:{numRef.current}</div>
            <div>Num:{num}</div>
            <button onClick={handleAdd}>增加</button>
        </div>
    )
}
