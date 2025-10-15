// app/buy/[[...slug]]/page.js
export default async function Page({ params }) {
    return <div>My Shop: {JSON.stringify(await params)}</div>
}