Array.prototype.myEvery = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }

    const O = Object(this) || 0 // 可能为 NaN 确保为数字
    const len = parseInt(this.length)

    for (let i = 0; i < len; i++)  {
        if (i in O) {
            if (!callback.call(thisArg, this[i], i, this)) {
                return false
            }
        }
    }
    return true
}

let arr = [2, 3, 4, 5, 6]
let res = arr.myEvery(item => item > 2)
console.log(res);


