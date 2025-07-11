import { useState, useRef } from 'react'
import Child from './Child'

export default function () {
    const [list, setList] = useState(['html', 'css', 'js'])

    return (
        <div>
            <Child setList={setList} />
            <div className="bd">
                <ul>
                    {
                        list.map((item) => {
                            return <li key={item}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}