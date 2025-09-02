function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            resolve('A success')
        }, 1500)
    })
}

function B() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('B');
            reject('B fail')
        }, 500)
    })
}

function C() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('C');
            reject('C fail')
        }, 1000)
    })
}

Promise.allSettled([A(), B(), C()]).then(
    (res) => {
        console.log(res);
    },
    (err) => {
        console.log(err);
    }
)