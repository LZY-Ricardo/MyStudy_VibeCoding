import { NextResponse } from 'next/server'
import { RateLimiter } from 'limiter'

// 创建限流器实例
const limiter = new RateLimiter({
    tokensPerInterval: 3,  // 每个时间间隔允许的请求令牌数（每分钟 3 个请求）
    interval: "min",       // 时间间隔单位："min"(分钟)、"sec"(秒)、"hour"(小时)
    fireImmediately: true  // 立即执行，不等待令牌补充
})

export async function GET() {
    // 尝试移除 1 个令牌，返回剩余令牌数
    const remainingRequests = await limiter.removeTokens(1)
    // 检查是否还有剩余配额
    if (remainingRequests < 0) {
        // 令牌不足 返回429错误 (请求过多)
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

    // 令牌充足, 正常返回数据
    return NextResponse.json({
        data: '你好!'
    })
}