// const d = new Date()
// console.log(d);
// console.log(d instanceof Date);


function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    let newObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                newObj[key] = deepClone(obj[key])
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}
// const obj = {
//     a: 1,
//     b: {
//         c: 2,
//         d: 3
//     },
//     e: new Date(),
//     f: function () {}
// }
// console.log(obj);

// const newObj = deepClone(obj)
// obj.e = new Date()
// // console.log(new Date(obj.e.getTime()));
// // console.log(obj);


// console.log(newObj);
// console.log(obj);

const d = new Date()
const newObj = deepClone(d)
console.log(newObj);

