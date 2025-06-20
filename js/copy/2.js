// let a = 1
// let b = a

// let obj = {
//     a: 1
// }

// let obj2 = new Object(obj) // 创建一个新对象, 让新对象的隐式原型指向obj
// console.log(obj2.a)

// let arr = [1, 2, 3]
// let arr2 = [4, 5]
// console.log(arr.concat(arr2));
// console.log(arr);
// let arr3 = [].concat(arr)
// console.log(arr3);

// let arr = [1, 2, 3]
// const [x, y, z]= arr
// console.log(x, y, z);
// console.log(...arr)

// let arr2 = [...arr]
// console.log(arr2);

// let arr = ['a', 'b', 'c', 'd', 'e']
// arr.splice(1, 0, 'o') // 会影响原数组
// let arr2 = arr.slice(0, arr.length) // 不影响原数组
// console.log(arr2);


// let obj = {
//     name: 'Ricardo',
//     age: 20
// }
// let girl = {
//     nickname: 'nono',
// }
// let newObj = Object.assign({}, obj)
// console.log(newObj);


// let newObj = Object.assign(obj, girl)
// console.log(newObj);
// console.log(obj);

let arr = [1, 2, 3]
let newArr = arr.toReversed().reverse()
console.log(newArr, arr);

// let newArr = arr.reverse()
// console.log(newArr, arr);



