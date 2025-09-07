Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) { // 查询不了 NaN
    if (this == null) { // 处理 this 为 null/undefined 的边界情况
        throw new TypeError('"this" is null or not defined');
    }

    const O = Object(this)
    const len = O.length >>> 0 // 确保长度为非负整数
    
    let n = fromIndex 
    if (n >= len) return -1
    if (n < 0) { // 处理负数的 fromIndex 参数
        n = len + n
        if (n < 0) n = 0
    }

    while (n < len) {
        if (O[n] === searchElement) {
            return n
        }
        n++
    }
    return -1
}

let arr = [1, 2, NaN, 3]
let res = arr.indexOf(NaN)
console.log(res);
