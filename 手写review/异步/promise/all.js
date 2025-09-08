function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            // reject('A fail')
            resolve('A success')
        }, 1500)
    })
}
function B() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('B');
            // reject('B fail')
            resolve('B success')
        }, 500)
    })
}
function C() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('C');
            // reject('C fail')
            resolve('C success')
        }, 1000)
    })
}

Promise.all('dsaf')
    .then(
        (res) => {
            console.log('res:',res)
        },
        (err) => {
            console.log(err)
        }
    )