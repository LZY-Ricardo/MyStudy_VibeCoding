const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
]

function minPathSum(grid) {
    const m = grid.length
    const n = grid[0].length

    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))

    dp[0][0] = grid[0][0]

    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }

    return dp[m - 1][n - 1]
}

function minPathSum(grid) {
    const m = grid.length
    const n = grid[0].length

    const dp = new Array(n).fill(0)

    dp[0] = grid[0][0]

    for (let j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j]
    }

    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0]
        for (let j = 1; j < n; j++) {
            dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j]
        }
    }

    return dp[n - 1]
}

console.log(minPathSum(grid)); // 输出: 7
  // 路径 1 → 3 → 1 → 1 → 1 的和最小