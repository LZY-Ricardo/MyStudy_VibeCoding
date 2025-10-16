// async function getData() {
//     // 接口每次调用都会返回一个随机的猫猫的图片数据
//     const res = await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'force-cache' })
//     if (!res.ok) {
//         throw new Error('Failed to fetch data')
//     }

//     return res.json()
// }

// export default async function Page() {
//     const data = await getData()

//     return <img src={data[0].url} width="300" />
// }

async function getData() {
    const res = await fetch('https://api.thecatapi.com/v1/images/search', { cache: 'force-cache', next: { tags: ['collection'] } })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const data = await getData()

    return <img src={data[0].url} width="300" />
}