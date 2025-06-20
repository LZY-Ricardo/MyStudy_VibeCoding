Object.prototype.sex = 'boy'
let obj = {
    name: 'Ricardo',
    age: 20,
    like: {
        a: '唱',
        b: '跳',
        c: 'rap'
    }
}
function shallowCopy(obj) {
    let newObj = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // 判断 key 是不是 obj 显示拥有的
            // console.log(key);
            newObj[key] = obj[key]
        }
    }     
    return newObj
}
console.log(shallowCopy(obj));
// Object.prototype.d = 4
// let o = {
//     a: 1,
//     b: 2,
//     c: 3,
// }
// console.log(o.d);

// for (let key in o) {
//     console.log(key)
// }

