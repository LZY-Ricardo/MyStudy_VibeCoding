Function.prototype.myCall = function(obj = globalThis, ...args) {
    // obj = obj ? obj : globalThis
    const fn = Symbol('fn')
    obj[fn] = this
    const result = obj[fn](...args)
    delete obj[fn] // 防止内存泄漏
    return result
}


function foo(b, c) {
    console.log('我是foo');
    console.log(this);
    console.log(this.a + b + c);
}

let obj = {
    a: 1,
    b: 2,
    c: 3
}

foo.myCall(obj, 2, 3)