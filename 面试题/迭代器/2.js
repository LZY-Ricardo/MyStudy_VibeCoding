// let arr = ['a', 'b', 'c']
// for (let item of arr) {
//     console.log(item)
// }
// Object.prototype.d = 4
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }
// for (let item of obj) { // TypeError: obj is not iterable
//     console.log(item)
// }
// for (let key in obj) { // 可以遍历到对象原型上的属性
//     console.log(key, obj[key])
// }


let arr = [1, 2, 3]
for (let index in arr) {
    console.log(index, arr[index])
}