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
    let map = {}
    return async function (key) {
        if (map[key] && map[key].lock) {
            if (map[key].data) {
                return map[key].data 
            } else {
                const res = await map[key].promise
                map[key].lock = false
                return res
            }
        }
        if (!map[key]) {
            map[key] = {
                data: null,
                lock: true, 
                promise: fn(key)
            }
        } 
        if (map[key].data) {
            map[key].lock = true
            map[key].promise = fn(key)
            map[key].promise.then((value) => {
                map[key] = {
                    data: value,
                    lock: false
                }
            })
            return map[key].data
        } else { // 第一次执行该接口
            const res = await map[key].promise
            map[key] = {
                data: res,
                lock: false
            }
            return res
        }
    }
}