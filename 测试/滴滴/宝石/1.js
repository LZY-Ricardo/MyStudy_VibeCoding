const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
var iter = rl[Symbol.asyncIterator]()
const readline = async () => {
    return (await iter.next()).value
}

(async function () {
    // 序列长度 宝石种类 初始位置
    let [n, m, p] = (await readline()).split(' ').map(Number) 
    let arr = (await readline()).split(' ').map(Number)
    p = p - 1 // 初始位置从0开始
    
    const allTypes = new Set(arr)
    if (allTypes.size === 1) {
        console.log(0);
        rl.close()
        return
    }
    let minTime = Infinity

    // 不断增加[l,r]的范围 直到包括所有种类宝石
    for (let l = 0; l < n; i++) {
        for (let r = l; r < n; r++) {
            let curTypes = new Set(arr.slice(l, r + 1))
            if (curTypes.size === m) { // 包含所有种类宝石
                let time = 0
                if (p >= l && p <= r) { // 初始位置在[l,r]范围内
                    time = (r - l) + Math.min(p - l, r - p)
                } else if (p < l) { // 初始位置比l还要左 需要的时间就是从p到r
                    time = r - p
                } else if (p > r) { // 初始位置比r还要右 需要的时间就是从l到p
                    time = p - l
                }
                minTime = Math.min(minTime, time) // 比较每一次获得所有种类宝石区间然后进行获取的最短时间
            }
        }
    }
    console.log(minTime);
    rl.close()
})()
