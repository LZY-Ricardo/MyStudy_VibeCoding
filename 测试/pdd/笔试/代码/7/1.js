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

// 存储请求状态、重试次数、缓存数据
const requestMap = new Map();

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


// （已在文件前部初始化 requestMap）

function getData(url, retry = 0) {
    // 检查是否有缓存 且未过期
    const cacheKey = `cache:${url}`;
    if (requestMap.has(cacheKey)) {
        const { response, expireTime } = requestMap.get(cacheKey);
        if (expireTime > Date.now()) {
            // 返回与首次请求一致的完整响应对象，保证结果形态一致
            return Promise.resolve(response);
        }
        // 缓存过期 删除缓存
        requestMap.delete(cacheKey);
    }

    // 检查是否有进行中的请求
    const requestKey = `request:${url}`;
    if (requestMap.has(requestKey)) {
        const state = requestMap.get(requestKey);
        // 动态更新重试上限为并发调用中的最大值
        state.maxRetry = Math.max(state.maxRetry, retry);
        return state.promise;
    }

    // 发起新请求
    const state = { currentRetry: 0, maxRetry: retry, promise: null };
    const promise = new Promise((resolve, reject) => {
        const fetchWithRetry = () => {
            fetch(url)
                .then((response) => {
                    // 请求成功 缓存完整响应对象 5s 过期
                    requestMap.set(cacheKey, {
                        response,
                        expireTime: Date.now() + 5000,
                    });
                    // 请求完成 删除进行中标记
                    requestMap.delete(requestKey);
                    resolve(response);
                })
                .catch((error) => {
                    state.currentRetry++;
                    if (state.currentRetry <= state.maxRetry) {
                        fetchWithRetry(); // 重试
                    } else {
                        // 超过最大重试次数 拒绝 Promise
                        requestMap.delete(requestKey);
                        reject(error);
                    }
                });
        };
        fetchWithRetry(); // 首次调用
    });

    // 存储进行中的请求与动态重试状态
    state.promise = promise;
    requestMap.set(requestKey, state);
    return promise;
}


