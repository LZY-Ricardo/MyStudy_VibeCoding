const nums = [1,3,-1,-3,5,3,6,7]

// 维护一个长度不超过窗口宽度的的单调递减队列
// [2, 1, 0] 6 // 6 妄图能让6进入队列的过程就是在找下一个最大值


// var maxSlidingWindow = function(nums, k) {
//     const len = nums.length
//     let left = 0
//     let right = k - 1
//     const res = []
//     while (right < len) {
//         // 获取left到right之间的最大值
//         const max = getMax(nums, left, right)
//         res.push(max)
//         left++
//         right++
//     }
//     return res
// };
// function getMax(nums, left, right){
//     let max = -Infinity
//     for (let i = left; i <= right; i++) {
//         if (nums[i] > max) {
//             max = nums[i]
//         }
//     }
//     return max
// }

var maxSlidingWindow = function(nums, k) {
    if (nums.length === 0) return []
    const deque = [] // 单调递减队列
    const res = []
    for (let i = 0; i < nums.length; i++) {
        // 如果队列不为空，且队列尾部的元素小于当前元素，则将队列尾部的元素弹出
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop()
        }
        // 将当前元素的索引加入队列
        deque.push(i)
        // 如果队列头部的元素已经不在窗口内，则将队列头部的元素弹出
        if (deque[0] < i - k + 1) {
            deque.shift()
        }
        // 如果窗口已经形成了，则将队列头部的元素加入结果数组
        if (i >= k - 1) {
            res.push(nums[deque[0]])
        }
    }
    return res
}

console.log(maxSlidingWindow(nums,3))