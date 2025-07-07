function foo() {
    return new Promise(resolve => {
        setTimeout(() => {
        console.log('foo ok');
        resolve()
    },2000)
    })
}

function bar() {
    console.log('bar ok');
}

foo().then(() => {
    bar()
})