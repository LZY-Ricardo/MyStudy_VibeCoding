function Person() {
    return function F() {
        this.name = 'sss'
        return foo()
    }
}

function foo() {
    console.log('123');
    
}

let p = new Person()
let n = new p()
console.log(n);


