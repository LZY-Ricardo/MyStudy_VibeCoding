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