// 两数之和
function twoSum(nums, target) { 
    const set = new Set(nums);
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;
        if (set.has(complement)) {
            return [num, complement];
        }
    }
    return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [2, 7]
console.log(twoSum([2, 7, 11, 15], 10)); // []
