function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            // reject('A fail')
            resolve('A success')
        }, 1500)
    })
}

A().finally((res) => {
    console.log('finally',res);
    return 'hello'
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})