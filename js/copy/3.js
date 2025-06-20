// let obj = {
//     name: 'Ricardo',
//     age: 20,
//     like: {
//         a: '唱',
//         b: '跳',
//         c: 'rap'
//     }
// }

// let newObj = Object.assign({}, obj)
// obj.like.a = 'basketball'
// console.log(newObj)

let arr = [1, 2, 3, {a: 4}]
let newArr = [].concat(arr)
arr[3].a = 40
console.log(newArr)