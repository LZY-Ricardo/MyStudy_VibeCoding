let arr = [1, 2, [3, 4], 5, [6, [7, 8, [9]]], 10]

// // 数组自带方法 flat
// let arr1 = arr.flat(Infinity)
// console.log(arr1)


// arr = [1, 'a', ['b', 2, 3, ['er', 4]], 'w24']
// // 如果数组中是纯数字或者字符 可以使用 toString 方法转换为字符串 再使用 split 方法转换为数组
// let arr2 = arr.toString().split(',')
// // 再使用 map 方法转换为数字 这一步骤只使用于 纯数字 或字符也是数字字符 才能使用
// arr2 = arr2.map(Number)
// console.log(arr2)


// 递归
// function flatten(arr) {
//     let res = []
//     for (let item of arr) {
//         if (Array.isArray(item)) {
//             res = res.concat(flatten(item)) // concat 会返回新数组
//         } else {
//             res.push(item)
//         }
//     }
//     return res
// }
// console.log(flatten(arr))

// // 递归优化 用reduce
// function flatten2(arr) {
//     return arr.reduce((pre, cur) => {
//         // if (Array.isArray(cur)) {
//         //     pre = pre.concat(flatten2(cur))
//         // } else {
//         //     pre.push(cur)
//         // }
//         // return pre
//         return pre.concat(Array.isArray(cur) ? flatten2(cur) : cur)
//     }, [])
// }
// console.log(flatten2(arr));


// while循环 + some
function flatten3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        console.log('s:',arr);
        console.log(...arr);
        
        arr = [].concat(...arr)
        console.log('f:',arr);
    }
    return arr
}
console.log(flatten3(arr));
