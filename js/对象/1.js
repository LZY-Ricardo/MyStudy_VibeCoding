// const obj = {    // 创建了一个对象字面量
//     name: '路明非',
//     age: 20
// }

// console.log(obj.age);
// console.log(obj['age'])
// obj.sex = 'boy' // 新增属性
// obj.age = 19 //修改属性

// delete obj.age // 删除属性

// console.log(obj)

// const a = 1
// a = 2    // error

// const a= {
//     b : 1
// }
// a.b = 2

var obj = {} // 字面量 | 直接量
// 构造函数 Object
var obj2 = new Object()
console.log(obj, obj2) // {} {}

// 自定义构造函数
var obj3 = new Person()
function Person() {}
console.log(obj3) // Person {}
