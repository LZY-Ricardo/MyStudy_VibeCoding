function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            resolve('A success')
        }, 1000)
    })
}

Promise.resolve(A()).then((res) => {
    console.log(res);
})