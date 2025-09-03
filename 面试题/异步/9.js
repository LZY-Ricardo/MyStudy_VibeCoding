function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A执行了');
            resolve('A')
        }, 1000)
    })
}

function B() {
    console.log('B');
    
}

function* foo() { // *
    const res = yield A() // yield A()
    console.log(res);
    
    B()
}
let it = foo()
it.next().value.then((res) => {
    it.next(res)
})
// console.log(foo());

