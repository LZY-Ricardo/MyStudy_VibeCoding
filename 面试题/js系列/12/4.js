// Object.prototype.toString
// Array.prototype.toString
// 其他

let p = Number(213)
Object.prototype.toString.call(123)
console.log(Object.prototype.toString.call(123));

function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}

console.log(type([]));
console.log(type({}));


