Array.prototype.myReduce = function (callback, initialValue) {
    if (this == null) { // 处理 this 为 null 或者 undefined 情况
        throw new TypeError('Array.prototype.reduce called on null or undefined')
    }
    if (typeof callback !== 'function') { 
        throw new TypeError(`${callback} is not a function`)
    }

    const O = Object(this) // 处理类数组
    const len = O.length >>> 0 // 确保长度不为负数

    let k = 0
    let accumulator // 累积值
    
    if (arguments.length >= 2) { // 有初始值 则把累计值赋初始值
        accumulator = initialValue
    } else { // 无初始值则使用数组第一个元素为累积值
        if (len === 0) { // 数组长度为 0 报错
            throw new TypeError('Reduce of empty array with no initial value')
        }
        accumulator = O[k++]
    }

    while (k < len) {
        if (k in O) { // 处理稀疏数组
            accumulator = callback(accumulator, O[k], k, O)
        }
        k++
    }

    return accumulator // 每一次的累积值返回给下一次使用
}