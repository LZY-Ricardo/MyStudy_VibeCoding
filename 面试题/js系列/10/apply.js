Function.prototype.myApply = function(context, ...args) {
    context = context || window
    const arg = args[0]
    if (!Array.isArray(arg)) {
        throw new TypeError('CreateListFromArrayLike called on non-object')
    }
    const fn = Symbol('fn')
    context[fn] = this
    const res = context[fn](...arg) // 隐式绑定
    delete context[fn]
    return res
}