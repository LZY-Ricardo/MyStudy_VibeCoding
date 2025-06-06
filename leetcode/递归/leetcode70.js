// 5
// 1 1 1 1 1
// 2 1 1 1
// 1 2 1 1
// 1 1 2 1
// 1 1 1 2
// 2 2 1
// 2 1 2
// 1 2 2

// 达到某个目标的所有解的个数
// 只要求解的个数, 不需要具体的解

// 动态规划

// f(n)
// f(n - 1)
// f(n - 2)

// f(n) = f(n - 1) + f(n - 2)

// const f = []
// var climbStairs = function(n) { // 当 n 为3时, 只要看 f 下标 3 有没有值
//     if (n === 1) return 1
//     if (n === 2) return 2
//     if (f[n] === undefined) {
//         f[n] = climbStairs(n - 1) + climbStairs(n - 2)
//     }
//     return f[n]
// }

// climbStairs(5)





// f(n) = f(n - 1) + f(n - 2) // 动态推到方程式

var climbStairs = function(n) {
    const f = []
    f[1] = 1
    f[2] = 2
    for (let i = 3; i <= n; i++) {
        f[i] = f[i - 1] + f[i - 2]
    }
    return f[n]
};