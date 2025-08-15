// // Person.prototype.say = function () {
// //   console.log('我是sss');
// // }
// // function Person() {
// //   this.name = 'sss'

// //   // let obj = {}
// //   // Person.call(obj)  // 为了 this.name = 'sss' 这行代码可以往 obj 上增加属性name
// //   // // 执行 this.name = 'sss'
// //   // obj.__proto__ = Person.prototype
// //   // return obj
// // }
// // let p = new Person()
// // p.say()


// // let obj = {}  // new Object()



// // +[]
// // // [].valueOf()


// // const arr = []
// // arr.push(1)



// Person.prototype.say = function () {
//   console.log('我是sss');
// }
// function Person() {
//   this.name = 'sss'
// }
// Boy.prototype = new Person()  // {name: 'sss'}.__proto__ === Person.prototype.__proto__ === Object.prototype.__proto__ == null
// function Boy() {
//   this.age = 18
// }
// let b = new Boy()  // {age: 18}.__proto__ === Boy.prototype
// console.log(b.run);



function Foo() {}
// Foo.prototype == new Object
// Foo.prototype.__proto__ == Object.prototype

// Foo == new Function()
// Foo.__proto__ == Function.prototype.__proto__ == Object.prototype


