// 获取cookie
// 方法一 使用 NextRequest 对象
export async function GET(request) {
    const token = request.cookies.get('token')
    request.cookies.set(`token2`, 123) // 设置的是请求的cookie 并没有设置响应的cookie
}

// 方法二 通过`next/headers`包提供的 `cookies`方法
import { cookies } from 'next/headers'
export async function GET(request) {
    const cookieStore = cookies()
    const token = (await cookieStore).get('token')

    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {'Set-Cookie': `token=${token}`}
    })
}

// 如何处理 Headers
// 方法一 使用 new Headers(request.headers) 创建一个新的 Headers 对象
export async function GET(request) {
    const headerList = new Headers(request.headers)
    const referer = headerList.get('referer')
}

// 方法二 通过`next/headers`包提供的 `headers`方法
import { headers } from 'next/headers'
export async function GET(request) {
    const headerList = headers()
    const referer = headerList.get('referer')

    return new Response('Hello, Next.js!', {
        status: 200,
        header: {referer: referer}
    })
}


// 如何设置 CORS
export async function GET(request) {
    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })
}

// 直接使用底层的Web API 实现 streaming
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next()
            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        }
    })
}

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

const encoder = new TextEncoder()

async function* makeIterator() {
    yield encoder.encode('<p>One</p>')
    await sleep(200)
    yield encoder.encode('<p>Two</p>')
    await sleep(200)
    yield encoder.encode('<p>Three</p>')
}

export async function GET() {
    const iterator = makeIterator()
    const stream = iteratorToStream(iterator)
    return new Response(stream)
}