Function.prototype.myApply = function(obj = globalThis, arr) {
    if (!Array.isArray(arr)) throw new Error('CreateListFromArrayLike called on non-object')
    const fn = Symbol('fn')
    obj[fn] = this
    const result = obj[fn](...arr)
    delete obj[fn]
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

foo.myApply(obj, 2, 3, 54, 46)