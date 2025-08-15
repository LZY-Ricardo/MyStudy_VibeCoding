function foo(x, y, z) {
    this.name = 'foo'
    console.log(this.a, x + y + z);
    // return 'hello'
}

let obj = {
    a: 1
}

// foo.call(obj, 1, 2)
// foo.apply(obj, [1, 2])
const baz = foo.bind(obj, 1, 2)
// baz(3, 4)
const p = new baz(4, 5)
console.log(p);
console.log(p.name);









