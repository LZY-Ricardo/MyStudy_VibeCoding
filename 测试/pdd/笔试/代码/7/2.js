// 存储请求状态 请求次数 缓存
const requestMap = new Map()

function getData(url, retry) {
    // 有请求缓存
    const cacheKey = `cache_${url}`
    if (requestMap.has(cacheKey)) {
        const { response, expireTime } = requestMap.get(cacheKey)
        if (expireTime >= Date.now()) {
            return Promise.resolve(response)
        }
        requestMap.delete(cacheKey)
    }

    // 有正在处理的相同请求
    const requestKey = `request_${url}`
    if (requestMap.has(requestKey)) {
        const state = requestMap.get(requestKey)
        state.MaxRetry = Math.max(state.MaxRetry, retry)
        return state.promise
    }

    // 发送新请求
    const state = {
        promise: null,
        requestKey,
        currentRetry: 0,
        MaxRetry: retry
    }
    const promise = new Promise((resolve, reject) => {
        const fetchWithRetry = () => {
            fetch()
                .then((response) => {
                    requestMap.set(cacheKey, {
                        response,
                        expireTime: Date.now() + 5000
                    })
                    requestMap.delete(requestKey)
                    resolve(response)
                })
                .catch((error) => {
                    state.currentRetry++
                    if (state.currentRetry <= state.MaxRetry) {
                        fetchWithRetry()
                    } else {
                        requestMap.delete(requestKey)
                        reject(error)
                    }
                })
        }
        fetchWithRetry()
    })

    state.promise = promise
    requestMap.set(requestKey, state)
    return promise
}






// 模拟 fetch
function fetch(url) {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 500); // 随机延迟 0~500ms
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve({ url, data: "测试数据", delay, timestamp: Date.now() });
            } else {
                reject(new Error(`请求失败，耗时 ${delay}ms, timestamp: ${Date.now()}`));
            }
        }, delay);
    });
}

// 测试示例
const a = getData("/api/user", 1).then(console.log).catch(console.error); // 发起请求，如果失败重试 1 次
const b = getData("/api/user").then(console.log).catch(console.error); // 请求未完成，复用 a；参数 retry 未传默认为 0，保持当前最大的 1 次
const c = getData("/api/user", 3).then(console.log).catch(console.error); // 请求未完成，复用 a，重试次数更新为最大值 3 次

setTimeout(() => {
    /**
     * 如果上次请求成功，缓存 5s 未过期，复用 a；
     * 如果上次请求已结束并失败，发起新的请求；
     * 如果上次请求未结束，重试次数更新为最大值 6 次
     */
    const d = getData("/api/user", 6).then(console.log).catch(console.error);
}, 1000);

setTimeout(() => {
    const e = getData("/api/user", 2).then(console.log).catch(console.error); // 缓存已过期，重新发起请求
}, 8000);