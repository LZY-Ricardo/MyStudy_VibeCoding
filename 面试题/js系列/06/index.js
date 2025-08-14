let a = 1
let b = 1
function foo() {
    let c = 2
    
    function bar() {
        console.log(c + b);
    }

    return bar
}

foo()()