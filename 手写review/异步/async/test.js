function next(value) {
    console.log(value);
    
}

Promise.resolve(123)
.then(next)