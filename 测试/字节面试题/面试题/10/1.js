// 题目：数组交集、并集、差集
// 描述：输入两个数组，分别返回
// 交集（共有元素）
// 并集（所有元素去重）
// 差集（A 有 B 无）
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];

// 交集
function intersection(arr1, arr2) { 
    return arr1.filter(item => arr2.includes(item))
}

// 并集
function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])]
}

// 差集
function difference(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item))
}

console.log(intersection(arr1, arr2))
console.log(union(arr1, arr2))
console.log(difference(arr1, arr2))