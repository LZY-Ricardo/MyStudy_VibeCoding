let nums = [2,7,11,15], target = 9

// var twoSum = function(nums, target) { //用空间换时间
//     for (let i = 0; i < nums.length; i++) {
//         let item = target - nums[i]
//         // 去数组中有没有 item, 有就返回索引
//         let j = nums.indexOf(item)
//         if(j !== -1 && j !== i){
//             return [i, j]
//         }
//     }
// }



var twoSum = function(nums, target) { //用空间换时间
    let diffs = {}
    for (let i = 0; i < nums.length; i++) {
        let item = target - nums[i]
        // 去 diffs 中找有没有 item
        if (diffs[item] != undefined && diffs[item] != i) {
            return [diffs[item], i]
        } 
        diffs[nums[i]] = i;
    }
}

console.log(twoSum(nums, target)) 