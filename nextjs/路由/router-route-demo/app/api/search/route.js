// 访问 /api/search?query=hello 获取网址参数
export function GET(request) { 
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') // query
}   