Array.prototype.myFindIndex = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`)
    }

    const O = Object(this)
    const len = parseInt(O.length) || 0

    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                return i
            }
        }
    }
    return -1 // 未找到符合 返回 -1
}