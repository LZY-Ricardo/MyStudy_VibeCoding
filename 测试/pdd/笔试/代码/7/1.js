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