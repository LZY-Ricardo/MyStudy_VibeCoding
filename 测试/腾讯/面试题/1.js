// 给定一个整数数组 cost，其中 cost[i] 是从第 i 个台阶向上爬需要支付的费用。一旦你支付了费用，你可以选择向上爬一个或两个台阶。你可以选择从下标为 0 或下标为 1 的台阶开始爬。请你计算并返回爬到楼顶的最小花费。

// 示例1：
// 输入
// cost = [10, 15, 20]

// 输出：
// 15

// 示例2：
// 输入：
// cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]

// 输出：
// 6
// （备注: 算法时间复杂度最好控制在O(n), 空间复杂度O(1)）
let cost = [10, 15, 20]
let cost2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
function foo(cost) {
    let N = cost.length
    let pre = 0
    let cur = 0
    for (let i = 0; i < N; i++) {
        const next = Math.min(pre, cur) + cost[i]
        console.log('   ', pre, cur)
        pre = cur
        cur = next
    }

    return Math.min(pre, cur)
}
function def(cost) {
    let N = cost.length
    const arr = new Array(N).fill(-1)
    const dfs = (i) => {
        // console.log('   ',i)
        if (i === 0 || i === 1) {
            return cost[i]
        }

        if (arr[i] !== -1) {
            return arr[i]
        }

        arr[i] = Math.min(dfs(i - 1), dfs(i - 2)) + cost[i]

        return arr[i]
    }
    // console.log(arr)
    return Math.min(dfs(N - 1), dfs(N - 2))
}
// console.log(foo(cost)); // 15
// console.log(foo(cost2)); // 6
console.log(def(cost)); // 15
console.log(def(cost2)); // 6