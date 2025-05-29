let nums = [2,7,11,15], target = 9

var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        let left = nums[i] //左手握着 2
        //右手把剩下的值都握一遍

        for (let j = i + 1; j < nums.length; j++) {
            let right = nums[j] //右手握着 7
            if (left + right === target) {
                return [i, j]
            }
        }
    }
}

console.log(twoSum(nums, target)) // [0, 1]