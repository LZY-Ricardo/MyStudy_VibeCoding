let sym = Symbol("test")
// console.log(sym.description);

function foo() {
    console.log('ddasda');
    
}

console.log('return ' + foo.toString());

let foo1 = new Function('return ' + foo.toString())()
foo1()

let foo2 = function (...args) {
    return foo.apply(this, args)
}
foo2()


console.log('(' + foo.toString() + ')');

let foo3 = eval('(' + foo.toString() + ')')
foo3()
