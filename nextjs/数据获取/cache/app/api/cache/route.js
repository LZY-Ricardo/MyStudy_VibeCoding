// 生产环境路由处理程序会被静态渲染
// 为了转为动态渲染
// 路由动态渲染
export const revalidate = 0
// fetch 强制缓存
export const fetchCache = 'force-cache'
export async function GET() {
    const res = await fetch('https://dog.ceo/api/breeds/image/random', { next: { tags: ['collection'] } })

    const data = await res.json()
    return Response.json({ data, now: Date.now() })
}