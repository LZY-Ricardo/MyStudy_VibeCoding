import { notFound } from 'next/navigation'

async function fetchUser(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return res.json()
}

export default async function Profile({ params }) {
    const user = await fetchUser(params.id)

    if (!user) {
        notFound()
    }

    return (
        <div>
            <h1>User {user.id}</h1>
            <p>{user.name}</p>
        </div>
    )
}

