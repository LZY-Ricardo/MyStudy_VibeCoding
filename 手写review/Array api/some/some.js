Array.prototype.mySome = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }
    
    // 处理类数组对象
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                return true; // 找到符合条件的立即返回true
            }
        }
    }
    return false; // 遍历完都没找到返回false
}

let arr = [1, 2, 3, 4, 5]
let res = arr.mySome(item => {
    if (item > 2) {
        return false
    }
})
console.log(res);

