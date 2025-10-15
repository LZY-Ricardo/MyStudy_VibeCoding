// app/shop/[...slug]/page.js
export default function Page({ params }) {
    return <div>My Shop: {JSON.stringify(params)}</div>
}