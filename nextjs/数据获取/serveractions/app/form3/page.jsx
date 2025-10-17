import { findToDos } from './action'
import AddToDoForm from './form'

export default async function Page() {
    const todos = await findToDos()

    return (
        <>
            <AddToDoForm />
            <ul>
                {todos.map((todo, i) => <li key={i}>{todo}</li>)}
            </ul>
        </>
    )
}