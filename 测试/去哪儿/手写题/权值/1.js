const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    let n = parseInt(await readline()); // 数组长度
    let arr = (await readline()).split(' ').map(Number) // 读取数组

    let initialPower = calculatePower(arr); // 计算初始值
    let maxPower = initialPower; // 最大权值

    // 遍历数组，每次增加1，计算权值，取最大值
    for (let i = 0; i < n; i++) {
        arr[i]++
        let newPower = calculatePower(arr)
        maxPower = Math.max(maxPower, newPower)
        arr[i]--
    }
    console.log(maxPower);
    
    // 计算权值
    function calculatePower(arr) {
        let power = 0
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                power += Math.pow(arr[i] - arr[j], 2)
            }
        }
        return power
    }
}();