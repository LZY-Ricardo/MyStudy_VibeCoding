function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            reject('A fail')
            resolve('A success')
        }, 1500)
    })
}
function B() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('B');
            reject('B fail')
            resolve('B success')
        }, 500)
    })
}
function C() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('C');
            reject('C fail')
            resolve('C success')
        }, 1000)
    })
}

Promise.race([A(), B(), C()])
    .then(
        (res) => {
            console.log(res)
        },
        (err) => {
            console.log(err)
        }
    )