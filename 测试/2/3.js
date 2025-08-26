for (var i = 0; i < 3; i++) {
    function foo(i) {
        setTimeout(() => {
            console.log(i);
        })
        console.log(i);
        
    }
    foo(i)
}