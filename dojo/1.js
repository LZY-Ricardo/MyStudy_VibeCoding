for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000)
}

for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000)
}

for (var i = 0; i < 3; i++) {
    function foo() { 
        var j = i
        setTimeout(() => {
            console.log(j)
        }, 1000)
    }
    foo()
}

for (var i = 0; i < 3; i++) {
    setTimeout((x) => console.log(x), 1000, i);
}

for (var i = 0; i < 3; i++) {
    (function (j) {
        setTimeout(() => console.log(j), 1000);
    })(i);
}



