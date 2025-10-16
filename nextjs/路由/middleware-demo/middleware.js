import { NextResponse } from 'next/server'
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
    tokensPerInterval: 3,
    interval: 'min',
    fireImmediately: true,
})

export async function middleware(request) {
    const remainingRequests = await limiter.removeTokens(1)
    if (remainingRequests < 0) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'Too many requests',
            }),
            {
                status: 429,
                headers: {
                    'content-type': 'application/json',
                }
            }
        )
    }

    return NextResponse.next()
}

// 设置匹配路径
export const config = {
    matcher: '/api/chat'
}

// 中间件需求多
// import { NextResponse } from 'next/server'

// async function middleware1(request) {
//     console.log(request.url)
//     return NextResponse.next()
// }

// async function middleware2(request) {
//     console.log(request.url)
//     return NextResponse.next()
// }

// export async function middleware(request) {
//     await middleware1(request)
//     await middleware2(request)
// }

// export const config = {
//     matcher: '/api/:path*',
// }



// 借助高阶函数
import { NextResponse } from 'next/server'

function chain(functions, index = 0) {
    const current = functions[index]
    if (current) {
        const next = chain(functions, index + 1)
        return current(next)
    }
    return () => NextResponse.next()
}



function withMiddleware1(middleware) {
    return async (request) => {
        console.log('middleware1' + request.url);
        return middleware(request)
    }
}

function withMiddleware2(middleware) {
    return async (request) => {
        console.log('middleware2' + request.url);
        return middleware(request)
    }
}

async function middleware(request) {
    console.log('middleware' + request.url);
    return NextResponse.next()
}

// export default withMiddleware2(withMiddleware1(middleware))

export default chain([withMiddleware1, withMiddleware2])