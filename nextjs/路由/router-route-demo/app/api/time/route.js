export const dynamic = 'force-dynamic' // 动态渲染模式
export const revalidate = 10 // 缓存时间为 10s 

// export async function GET() {
//     console.log('GET /api/time')
//     return Response.json({ data: new Date().toLocaleTimeString() })
// }


// export async function GET(request) {
//     const searchParams = request.nextUrl.searchParams
//     return Response.json({ data: new Date().toLocaleTimeString(), params: searchParams.toString() })
// }

export async function GET(request) {
    const token = request.cookies.get('token')
    return Response.json({ data: new Date().toLocaleTimeString() })
}

export async function POST() {
    console.log('POST /api/time');
    return Response.json({
        data: new Date().toISOString()
    })
}