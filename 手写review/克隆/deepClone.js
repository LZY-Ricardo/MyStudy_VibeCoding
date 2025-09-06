function deepClone(obj) {
    let newObj = {}
    if (Array.isArray(obj)) { // 如果是数组则创建一个新数组 
        newObj = []
    }
    if (obj instanceof Date) { // 如果是日期对象
        newObj = new Date(obj) 
    }
    if (obj instanceof RegExp) { // 如果是正则对象
        newObj = new RegExp(obj) 
    }
    if (obj instanceof Set) { // 如果是Set对象
        newObj = new Set(obj)
    }

    for (let key in obj) {
        if (obj.hasOwnProperty) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = deepClone(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }

    return newObj
}

let obj = {
    name: 'obj',
    like: ['a', 'b', 'c'],
    date: new Date(),
    reg: /\d+/,
    set: new Set([1, 2, 3]),
    set2: new Set([4, 5, '9', {
        name: 'set2'
    }]),
    asd: [1, 2, {
        name: 'asd'
    }],
    dd: null,
    ee: undefined,
    ff: function() {
        console.log('hello world');
    }
}
console.log(obj);
let newObj = deepClone(obj)
console.log(newObj);