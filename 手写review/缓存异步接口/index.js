const ajax = (() => {
    let id = 0
    return async (req) => {
        await new Promise((r) => {
            setTimeout(r, 1000)
        })
        return {
            req,
            id: id++
        }
    }
})()

const cache_Api = cacheApi(ajax);

(async () => {
    console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
    // 一秒后输出[{req:'a',id:0},{req:'b',id:1},{req:'a',id:0}]

    console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
    // 立即输出[{req:'a',id:0},{req:'b',id:1},{req:'a',id:0}]

    await new Promise((r) => setTimeout(r, 1000))
    console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
    // 立即输出[{req:'a',id:2},{req:'b',id:3},{req:'a',id:2}]

})()

function cacheApi(fn) {
    const map = new Map()
    return async function (key) {
        if (map.has(key) && map.get(key).lock) { 
            if (map.get(key).data) { // 第二次 all 中的 第三个请求 a 走这
                map.get(key).lock = false                
                return map.get(key).data
            } else { // 第一次 all 中得 第三个 请求走这
                const res = await map.get(key).promise
                map.get(key).lock = false
                return res
            }
        }
        // 初始化
        if (!map.has(key)) {
            map.set(key, {
                data: null,
                lock: true, // 锁住 表示当前请求正在执行
                promise: fn(key)
            })
        }
        if (map.get(key).data) {
            map.get(key).lock = true
            map.get(key).promise = fn(key)
            map.get(key).promise.then((res) => {
                map.set(key, {
                    data: res,
                    lock: false
                })
            })
            return map.get(key).data
        } else {
            // 第一次执行该请求
            const res = await map.get(key).promise
            map.set(key, { // 执行完成
                data: res, // 存入执行结果
                lock: false // 解锁
            })
            return res
        }
    }
}