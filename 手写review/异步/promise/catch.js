function foo() {
    return new Promise((resolve, reject) => {
        console.log('foo');
        // resolve('suc')
        reject('fai')
    }) 
}

foo().then(
    (value) => {
        console.log(value);
        
    }
)
    .catch((err) => {
    console.log(err);
    
})