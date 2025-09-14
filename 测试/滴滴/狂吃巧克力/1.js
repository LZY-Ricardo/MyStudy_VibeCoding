const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
var iter = rl[Symbol.asyncIterator]()
const readline = async () => {
    return (await iter.next()).value
}

(async function () {
    let n = parseInt(await readline())
    let arr = [] // 记录每组巧克力的长度 和 能接收的最大甜度
    let cha = [] // 记录每一组巧克力
    for (let i = 0; i < n; i++) {
        let [a, b] = (await readline()).split(' ').map(Number)
        arr[i] = [a, b]
        cha[i] = (await readline()).split(' ').map(Number)
    }
    // console.log(arr)
    // console.log(cha)
    for (let i = 0; i < n; i++) {
        let [a, b] = arr[i]
        let curArr = cha[i]
        let ans = solve(b, curArr) // 能掰下来的最大长度
        console.log(ans)
    }
    rl.close()

    function solve(K, arr) {
        let prefixSum = 0 
        let maxVal = 0
        let maxLength = 0
        
        for (let i = 0; i < arr.length; i++) {
            prefixSum += arr[i]
            // 更新掰下来的巧克力中最甜的那块
            if (arr[i] > maxVal) {
                maxVal = arr[i]
            } 
            // 删除后甜度没有超过K 说明可以掰下来i + 1块巧克力
            let sumRemoveMax = prefixSum - maxVal
            if (sumRemoveMax <= K) {
                maxLength = i + 1 // 更新最大长度
            }
        }
        return maxLength
    }
})()