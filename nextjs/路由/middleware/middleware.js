// middleware.js
import Head from 'next/head'
import { NextResponse } from 'next/server'

export default function middleware(request) {
    // return NextResponse.redirect(new URL('/home', request.url))

    if (request.nextUrl.pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/about-2', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    }
}

// 设置匹配路径
export const config = {
    // matcher: '/about/:path*',

    // matcher: ['/about/:path*', '/dashboard/:path*'],
    
    // matcher: [
    //     /*
    //      * 匹配所有的路径除了以这些作为开头的：
    //      * - api (API routes)
    //      * - _next/static (static files)
    //      * - _next/image (image optimization files)
    //      * - favicon.ico (favicon file)
    //      */
    //     '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // ],

    matcher: [
        {
            source: '/api/*',
            has: [
                {
                    type: 'header',
                    key: 'Authorization',
                    value: 'Bearer Token'
                },
                {
                    type: 'query',
                    key: 'userId',
                    value: '123456'
                }
            ],
            missing: [{
                type: 'cookie',
                key: 'session',
                value: 'active'
            }]
        },

    ]
}



// 如何读取设设置 cookies
import { NextResponse } from 'next/server'

export function middleware(request) {
    // 假设传入的请求 header 里, "Cookie: nextjs=fast"
    let cookie = request.cookies.get('nextjs')
    console.log(cookie) // { name: 'nextjs', value: 'fast', Path: '/'}
    const allCookies = request.cookies.getAll()
    console.log(allCookies) // [{ name: 'nextjs', value: 'fast'}]

    request.cookies.has('nextjs') // true
    request.cookies.delete('nextjs')
    request.cookies.has('nextjs') // false

    // 设置 cookies
    const response = NextResponse.next()
    response.cookies.set('vercel', 'fast') // 设置名为vercel 值为fast
    response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path:'/' // cookie 的有效路径 / 表示全站有效
    })
    cookie = response.cookies.get('vercel')
    console.log(cookie) // { name: 'vercel', value: 'fast', Path: '/'}

    // 响应 header 为 `Set-Cookie:vercel=fast; path=/test`
    return response
}


// 如何读取和设置 headers
import { NextResponse } from 'next/server'

export function middleware(request) {
    // clone 请求标头
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-hello-from-middleware1', 'hello')

    // 你也可以在 NextResponse.rewrite 中设置请求标头
    const response = NextResponse.next({
        request: {
            // 设置新请求标头
            headers: requestHeaders,
        }
    })

    // 设置新响应标头 'x-hello-from-middleware2'
    response.headers.set('x-hello-from-middleware2', 'hello')
    return response
}


// CORS
import { NextResponse } from 'next/server'

const allowedOrigins = ['https://example.com', 'https://nextjs.org']

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request) {
    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)

    // Handle preflighted requests 处理预检请求
    const isPreflight = request.method === 'OPTIONS' 

    if (isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
            ...corsOptions,
        }
        return NextResponse.json({}, { headers: preflightHeaders })
    }

    // Handle simple requests 处理简单请求
    const response = NextResponse.next()
    
    if (isAllowedOrigin) { 
        response.headers.set('Access-Control-Allow-Origin', origin)
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value)
    })

    return response
}
// export const config = {
//     matcher: '/api/:path*',
// }



// 如何直接响应
import { NextResponse } from 'next/server'
import { isAuthenticated } from '@lib/auth'
// export const config = {
//     matcher: '/api/:function*'
// }
export function middleware(request) {
    // 鉴权判断
    if (!isAuthenticated(request)) {
        // 返回错误信息
        return new NextResponse(
            JSON.stringify({
                success: false, 
                message: 'authentication failed',
            }),
            {
                status: 401,
                headers: {
                    'content-type': 'application/json',
                }
            }
        )
    }
}
