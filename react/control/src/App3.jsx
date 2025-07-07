import { useEffect, useState } from "react"

async function queryData() {
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(666)
        },2000)
    })
    return data
}

function App() {
    const [num, setNum] = useState(0)
    useEffect(() => {
        queryData().then(data => {
            setNum(data)
        })
    }, [])
    return (
        <div onClick={() => {
            setNum((preNum) => preNum + 1)
        }}>{num}</div>
    )
}
export default App