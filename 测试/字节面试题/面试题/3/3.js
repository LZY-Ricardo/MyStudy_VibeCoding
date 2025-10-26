// 数组扁平化
const arr = [1, 2, [3, 4], 5, [6, [7, 8, [9]]], 10]

function flatten(arr) {
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            pre = pre.concat(flatten(cur))
        } else {
            pre.push(cur)
        }
        return pre
    }, [])
}
console.log(flatten(arr));

function flatten2(arr) {
    let newArr = []
    for (let item of arr) {
        if (Array.isArray(item)) {
            newArr =  newArr.concat(flatten2(item))
        } else {
            newArr.push(item)
        }
    }
    return newArr
}
console.log(flatten2(arr))

function flatten3(arr) {
    while (arr.some(item => Array.isArray(item))) { 
        arr = [].concat(...arr)
    }
    return arr
}
console.log(flatten3(arr));
