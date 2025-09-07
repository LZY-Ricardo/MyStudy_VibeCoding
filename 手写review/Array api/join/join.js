Array.prototype.myJoin = function (separator = ',') {
    const O = Object(this) // 可以处理类数组
    const len = parseInt(O.length) || 0 // 获取长度
    const sep = String(separator) // 转换分隔符

    let res = ''
    for (let i = 0; i < len; i++) {
        if (i > 0) {
            res += sep // 添加分隔符
        }
        if (i in O) {
            const element = O[i]
            // 处理 null 和 undefined
            if (element === null || element === undefined) {
                // 跳过，不添加任何内容
            } else {
                res += String(element)
            }
        }
    }
    return res
}

let arr = [1, 2, 3, 4, 5]
let res = arr.myJoin()
console.log(res);
