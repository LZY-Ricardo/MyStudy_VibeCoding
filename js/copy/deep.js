let obj = {
    name: 'Ricardo',
    age: 20,
    like: {
        a: '唱',
        b: '跳',
        c: 'rap'
    },
    a: undefined,
    b: null,
    // c: function() {},
    // d: Symbol('something for nothing'),
    // e: 666n
    e: {}
}

function deepCopy(obj) {
    let newObj = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 先判断 obj[key] 值的类型, 如果是原始类型, 直接赋值, 如果是引用类型,
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = deepCopy(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}
// 测试
let newObj = deepCopy(obj)
obj.like.a = 'basketball'
console.log(newObj);
