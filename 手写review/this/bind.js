Function.prototype.myBind = function (obj = globalThis, ...args1) {
    let fn = this
    return function f(...args2) {
        let args = [...args1, ...args2]
        if (this instanceof f) {
            return new fn(...args)
        }
        return fn.apply(obj, args)
    }
}


function foo(b, c) {
    console.log('我是foo');
    console.log(this.a);
    console.log(this.a + b + c);
}

let obj = {
    a: 1,
    b: 2,
    c: 3
}

let bar = foo.myBind(obj, 2)
bar(3)

let b = new bar(3)
console.log(b);
