// app/blog/[slug]/page.js
export default function Page({ params }) {
    return <div>My Post: {params.slug}</div>
}