function foo(x, y) {
    console.log(this.a, x + y)
}

var obj = {
    a: 1
}

// foo.call(obj, 1, 2) // 1 3 显示绑定
// foo.apply(obj, [1, 2])
const bar = foo.bind(obj, 2, 3)
bar(1, 2)