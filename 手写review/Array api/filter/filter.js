Array.prototype.myFilter = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    const O = Object(this)
    const len = parseInt(this.length) || 0

    const res = []

    for (let i = 0; i < len; i++) {
        if (i in O) { // 处理稀疏数组
            const element = O[i]
            const shouldInclude = callback.call(thisArg, element, i, O) 
            if (shouldInclude) { // 满足筛选
                res.push(element)
            }
        }
    }

    return res
}