function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}

let arr = []
console.log(type(arr));

let date = new Date()
console.log(type(date));

let obj = {}
console.log(type(obj));

let reg = new RegExp()
console.log(type(reg));
