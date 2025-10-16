// export const revalidate = 10
// export default async function Page() { // 静态渲染

//     const url = (await (await fetch('https://api.thecatapi.com/v1/images/search')).json())[0].url

//     return (
//         <img src={url} width="300" alt="cat" />
//     )
// }


// 动态渲染
// import { cookies } from 'next/headers'
// export default async function Page() {
//     const cookieStore = cookies()
//     const theme = cookieStore.get('theme')

//     const url = (await (await fetch('https://api.thecatapi.com/v1/images/search')).json())[0].url

//     return (
//         <img src={url} width="300" alt="cat" />
//     )
// }


// 动态渲染 同时 不缓存 请求数据
export default async function Page({ searchParams }) {
    const url = (await (await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'no-store' })).json())[0].url
    return (
        <>
            <img src={url} width="300" alt="cat" />
            {new Date().toLocaleTimeString()}
            {JSON.stringify(searchParams)}
        </>
    )
}