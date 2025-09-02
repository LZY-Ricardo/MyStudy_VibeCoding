class MyPromise {
    constructor(executor) {
        this.state = 'pending' // 状态
        this.onFulfilledCallbacks = [] // 成功的回调函数
        this.onRejectedCallbacks = [] // 失败的回调函数
        this.value = undefined
        this.reason = undefined
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value // 保存成功的值
                // 帮忙把 then 中的函数取出来执行
                this.onFulfilledCallbacks.forEach(fn => fn(value)) 
            }
        }

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason // 保存失败的原因
                // 帮忙把 catch 中的函数取出来执行
                this.onRejectedCallbacks.forEach(fn => fn(reason))
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected) { 
        // onFulfilled 被存起来 this.onFulfilledCallbacks
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        // onRejected 被存起来
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

        // 默认返回一个 promise 对象
        const newPromise = new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled') { // onFulfilled 要自己触发
                setTimeout(() => { // 模拟异步 假设此处是微任务
                    try {
                        const result = onFulfilled(this.value) // 传递保存的值
                        resolve(result)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.state === 'rejected') { // onRejected 要自己触发
                setTimeout(() => {
                    try {
                        const result = onRejected(this.reason) // 传递保存的原因
                        resolve(result)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.state === 'pending') { // onFulfilled 和 onRejected 都要存起来
                this.onFulfilledCallbacks.push((value) => {  // 存入 this.onFulfilledCallbacks
                    setTimeout(() => {
                        try {
                            const result = onFulfilled(value)
                            resolve(result)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push((reason) => { // 存入 this.onRejectedCallbacks
                    setTimeout(() => {
                        try {
                            const result = onRejected(reason)
                            resolve(result)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return newPromise
    }
    catch(onRejected) {
        // onRejected 被存起来
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }
    }
}

let p = new MyPromise((resolve, reject) => {
//    setTimeout(() => {
//         resolve('ok1')
//         // reject('fail555')
//     }, 0)
    // resolve('ok1')
    reject('fail555')
})
p.then((res) => {
    console.log('成功then1', res);
    // return 'ok2'
    test(123)
}, (err) => {
    console.log('失败', err);
})
// .then((res) => {
//     console.log('成功then2', res);
// })
.catch((err) => {
    console.log('失败', err);
})

function test(a) {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            console.log(a);
            // resolve('ok1')
            reject('fail')
        }, 1000)
    })
}

// test(123).then((res) => {
//     console.log('成功', res);
// }).catch((err) => {
//     console.log('失败', err);
// })
