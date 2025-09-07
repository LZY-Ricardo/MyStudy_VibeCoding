const readline = require('readline')
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []
r1.on('line', (line) => {
    lines.push(line)
    if (lines.length === 3) {
        solve()
        r1.close()
    }
})

function solve() {
    let [n, m, V] = lines[0].split(' ').map(Number)
    const a = lines[1].split(' ').map(Number).sort((x, y) => x - y)
    const b = lines[2].split(' ').map(Number).sort((x, y) => x - y)
    let maxPeople = 0
    // for (let i = 0; i < n; i++) {
    //     let cur = a[i]


        // for (let j = 0; j < m; j++) {
        //     if (cur >= b[j]) {
        //         maxPeople++
        //         b[j] = Infinity
        //     } else if (cur < b[j] && cur + V >= b[j]) (
        //         maxPeople++,
        //         V = V - (b[j] - cur),
        //         b[j] = Infinity
        //     )
        // }


    //     let j = 0
    //     while (j < m) {
    //         if (b[j]) {
    //             if (cur >= b[j]) {
    //                 maxPeople++
    //                 b[j] = false
    //                 break
    //             }
    //             if (cur < b[j] && cur + V >= b[j]) {
    //                 maxPeople++
    //                 V = V - (b[j] - cur)
    //                 b[j] = false
    //                 break
    //             }
    //             if (cur + V < b[j]) {
    //                 break
    //             }
    //         }
    //         j++
    //     }
    // }

    // 最多能帮助的市民数量不会超过市民总数和房产总数中的较小值
    let left = 0
    let right = Math.min(n, m)
    // 二分查找最多能帮助的市民数量
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        let totalSubsidy = 0
        let flag = true

        // 计算帮助前mid位市民需要的补贴
        for (let i = 0; i < mid; i++) {
            // 市民i 购买 房产i
            const need = b[i] - a[i]
            // 如果需要补贴就加上
            if (need > 0) {
                totalSubsidy += need
                // 补贴超过预算 则不能帮助 mid 位市民
                if (totalSubsidy > V) {
                    flag = false
                    break
                }
            }
        }

        // 能够帮助 mid 位市民 尝试帮助 更多位市民
        if (flag) {
            maxPeople = mid
            left = mid + 1
        } else { // 不能帮助 mid 位市民 尝试减少市民数量
            right = mid - 1
        }
    }

    console.log(n - maxPeople);
}