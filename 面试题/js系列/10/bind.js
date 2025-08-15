Function.prototype.myBind = function(context, ...args1) {
    let _this = this
    return function F(...args2) {
        this.name = 'sss'

        if (this instanceof F) { // 我是不是被 new 了
            return new _this(...args1, ...args2)
        } else {
            return _this.apply(context, [...args1, ...args2])
        }
    }
}



function foo(x, y, z) {
    console.log(this.a, x + y + z);
    // return 'hello'
}

let obj = {
    a: 1
}

let bar = foo.myBind(obj, 1, 2)
// bar(3)
let p = new bar(4, 5)
console.log(p);

