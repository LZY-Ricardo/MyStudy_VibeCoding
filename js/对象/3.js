// 原始类型一定不能添加属性和方法, 属性和方法时对象独有的

// var num = 123 // new Number(123)
// num.a = 'aaa'
// delete num.a
// console.log(num.a) // undefined

// var num = new Number(123)
// num.a = 'aaa'
// console.log(num + 1) // 124
// console.log(num.a)

// var str = 'hello' // let str = new String('hello')
// str.len = 3
// console.log(str.length);


// 考点
var arr = [1, 2, 3 ,4, 5] 
arr.length = 2
console.log(arr) // [1, 2]

var str = 'abcd' // let str = new String('abcd')
str.length = 2
// delete str.length
console.log(str.length) // 4