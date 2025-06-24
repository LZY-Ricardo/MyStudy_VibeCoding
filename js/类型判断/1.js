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

console.log(typeof(s)); // string
console.log(typeof(n)); // number
console.log(typeof(f)); // boolean
console.log(typeof(u)); // undefined
console.log(typeof(nu)); // object
console.log(typeof sy); // symbol
console.log(typeof b); // bigint
console.log(typeof arr); // object
console.log(typeof obj); // object
console.log(typeof fun); // function
console.log(typeof date); // object
console.log(typeof set); // object
console.log(typeof map); // object

if (typeof a === 'object' && a !== null) {
    console.log('a是引用类型');
}
