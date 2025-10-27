// 2、实现一个带超时设置的异步方法
const asyncCallWithTimeout = (asyncPromise, timeLimit) => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, timeLimit)
    })
    return Promise.race([promise, asyncPromise])
};

const res = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('suc')
    }, 300)
})
asyncCallWithTimeout(res, 200)
    .then((val) => {
        console.log(val)
    })
    .catch((error) => {
        console.log(error)
    })
asyncCallWithTimeout(res, 400)
    .then((val) => {
        console.log(val)
    })
    .catch((error) => {
        console.log(error)
    })

