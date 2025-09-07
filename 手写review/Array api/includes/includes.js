Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
    if (this == null) { // 写 ==  同时检查 undefined 和 null
        throw TypeError(`"this" is null or not defined`)
    }

    const O = Object(this)
    const len = O.length >>> 0 // 确保长度未非负整数

    if (len === 0) return false

    let n = fromIndex
    if (n >= len) return false // 长度越界
    if (n < 0) { // 处理负起始下标
        n = len + n
        if (n < 0) n = 0
    }

    while (n < len) {
        // 找到符合的元素 同时处理了找 NaN 的情况
        if (O[n] === searchElement || 
            (Number.isNaN(searchElement) && Number.isNaN(O[n]))
        ) {
            return true
        }
        n++
    }
    return false
}