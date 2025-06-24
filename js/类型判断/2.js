let s = 'hello'
let n = 123
let f = false
let u = undefined
let nu = null
let sy = Symbol(1)
let b = 1231231231n

let arr = []
let obj = {}
let fun = function() {}
let date = new Date()
let set = new Set()
let map = new Map()

// console.log(arr instanceof Array); // true    arr.__proto__ === Array.prototype.__proto__ === Object.prototype.__proto__ === null

console.log(arr instanceof Object) // true

// console.log(obj instanceof Object); // true
// console.log(fun instanceof Function); // true
// console.log(date instanceof Date); // true
// console.log(set instanceof Set); // true
// console.log(map instanceof Map); // true




// console.log(s instanceof String); // false
// console.log(n instanceof Number); // false
// console.log(f instanceof Boolean); // false
// console.log(u instanceof Undefined); // error
// console.log(nu instanceof Null); // error
// console.log(sy instanceof Symbol); // false
// console.log(b instanceof BigInt); // false




