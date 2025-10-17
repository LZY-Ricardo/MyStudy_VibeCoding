import { useEffect, useState } from "react";

export default function Page() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data } =await (await fetch('api/todos')).json()
            setTodos(data)
        }
        fetchData()
    }, [])

    async function onSubmit(event) {
        event.preventDefault()
        const response = await fetch('api/todos', {
            method: 'POST',
            body: new FormData(event.currentTarget)
        })

        const {data} = await response.json()
        setTodos(data)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" name="todo" />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {todos.map((todo, i) => <li key={i}>{todo}</li>)}
            </ul>
        </>
    )
}