function foo(str) {
    let a = 1
    eval(str) // var b = 2
    console.log(b);
}
foo('var b = 2')