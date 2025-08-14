let obj = {
    name: 'sss',
    age: 18,
    like: ['music', 'game'],
    a: undefined,
    b: null,
    c: function() {},
    e: Symbol('sss'),
    f: 123n
}
// obj.e = {}
// obj.e.n = obj

function deepClone(obj) { 
    let res = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                res[key] = deepClone(obj[key])
            } else {
                res[key] = obj[key]
            }
        }
    }
    return res
}
const newObj = deepClone(obj)
obj.like.push('run')
console.log(obj, newObj);

