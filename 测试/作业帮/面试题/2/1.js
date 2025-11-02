// 题目要求：
// 实现一个 retry 函数，尽量通用。
// 示例中 retry(request, 2) 表示最多重试 2 次（即最多调用 3 次）。
// 使用 fetch 请求 / api / get - movie，参数通过 JSON.stringify(params) 传入 body。
// 示例调用：retryRequest({ movieId: 1001 })，并使用 await 获取结果。

const retry = (fn, maxRetries) => {
    return async (...args) => {
        let lastError
        // 总共尝试 maxRetries + 1 次 (第一次尝试 + maxRetries次重试)
        for (let i = 0; i <= maxRetries; i++) { 
            try {
                const result = await fn(...args)
                return result
            } catch (error) {
                lastError = error
                console.log(`第${i + 1}次重试失败，还剩${maxRetries - i - 1}次机会```)
            }
        }
        // 所有重试都失败后, 抛出最后一个错误
        throw lastError
    }
}
  
// 支持延迟重试
const retryWithDelay = (fn, maxRetries, delay) => { 
    return async (...args) => {
        let lastError
        for (let i = 0; i <= maxRetries; i++) { 
            try {
                const result = await fn(...args)
                return result
            } catch (error) {
                lastError = error
                console.log(`第${i + 1}次重试失败，还剩${maxRetries - i - 1}次机会`)
                if (i < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, delay))
                }
            }
        }
        throw lastError
    }
}

const retryWithBackoff = (fn, maxRetries, initialDelay = 1000) => {
    return async (...args) => {
        let lastError
        for (let i = 0; i <= maxRetries; i++) { 
            try {
                const result = await fn(...args)
                return result
            } catch (error) {
                lastError = error
                console.log(`第${i + 1}次重试失败，还剩${maxRetries - i - 1}次机会`)

                if (i < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, initialDelay * Math.pow(2, i)))
                } else {
                    console.log('所有重试都失败了')
                }
            }
        }
        throw lastError
    }
}


const request = (params) => fetch('/api/get-movie', {
    body: JSON.stringify(params)
});

const retryRequest = retry(request, 2);
const response = await retryRequest({ movieId: 1001 });