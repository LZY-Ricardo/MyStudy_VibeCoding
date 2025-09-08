class myPromise {
    constructor(executor) {
        this.state = 'pending'
        this.value
        this.reason
        this.onFulfilledCallbacks = [] // 存放成功状态要执行的回调函数
        this.onRejectedCallbacks = [] // 存放失败状态要执行的回调函数

        const resolve = (value) => {
            if (this.state === 'pending') {
                // 如果返回值是Promise对象，需要等待其状态确定
                // - 如果 value （传入的 Promise）最终变为 fulfilled ，则调用当前 Promise 的 resolve
                // - 如果 value （传入的 Promise）最终变为 rejected ，则调用当前 Promise 的 reject
                // 相当于递归调用 扁片化promise
                if (value instanceof myPromise) {
                    value.then(resolve, reject)
                    return
                }
                this.state = 'fulfilled'
                this.value = value // 保存成功值
                this.onFulfilledCallbacks.forEach(callback => callback(value)) // 将 成功队列中的回调函数全部拿出来执行
                this.onFulfilledCallbacks = [] // 执行完毕后清空队列
            }
        }

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = reason // 保存失败值
                this.onRejectedCallbacks.forEach(callback => callback(reason)) // 将 失败队列中的回调函数全部拿出来执行
                this.onRejectedCallbacks = [] // 执行完毕后清空队列
            }
        }

        try {
            executor(resolve, reject) // promise 中的代码是同步代码 new 的时候直接执行
        } catch (error) {
            reject(error) // 如果executor执行出错，直接reject
        }
    }

    then(onFulfilled, onRejected) {
        // then 接收的参数为两个回调函数 也可以接收不是函数的变量 不会报错
        onFulfilled = onFulfilled instanceof Function ? onFulfilled : (value) => value
        onRejected = onRejected instanceof Function ? onRejected : (reason) => { throw reason }

        // then 默认返回一个 promise 对象
        return new myPromise((resolve, reject) => {
            // 处理回调结果的通用函数
            const handleCallback = (callback, value) => {
                queueMicrotask(() => {
                    try {
                        const result = callback(value)
                        // 如果返回值是Promise对象，需要等待其状态确定
                        if (result instanceof myPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result) // 无论原来是fulfilled还是rejected，只要回调正常执行就resolve
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.state === 'fulfilled') { // 执行 promise 函数时里面已经触发了状态变更 为 fulfilled
                handleCallback(onFulfilled, this.value)
            }

            if (this.state === 'rejected') { // 执行 promise 函数时里面已经触发了状态变更 为 rejected
                handleCallback(onRejected, this.reason)
            }

            if (this.state === 'pending') { // 执行 promise 函数时 状态变更代码位于异步代码之中 将回调函数存入待执行队列
                this.onFulfilledCallbacks.push((value) => {
                    handleCallback(onFulfilled, value)
                })
                this.onRejectedCallbacks.push((reason) => {
                    handleCallback(onRejected, reason)
                })
            }
        })
    }

    // 接收一个 全是promise对象的数组 会将所有promise对象全部执行 同时返回一个新的promise对象 resolve/reject出来的结果是最快执行完毕的那个 promise 元素的结果
    static race(promises) {
        return new myPromise((resolve, reject) => {
            for (let promise of promises) {
                promise.then(
                    (res) => {
                        resolve(res)
                    },
                    (err) => {
                        reject(err)
                    }
                )
            }
        })
    }

    // 接收一个 全是promise对象的数组 会将所有promise对象全部执行 同时返回一个新的promise对象 如果所有元素全部resolve成功 将 resolve 出来一个数组 包含所有元素的 resolve 值， 有一个失败则直接 reject 出最快失败的那个元素 reject 的错误 
    static all(promises) {
        return new myPromise((resolve, reject) => {
            const len = promises.length
            let arr = new Array(len) // 存放所有元素的成功值
            let num = 0 // 统计多少个元素resolve成功
            for (let i = 0; i < len; i++) {
                const promise = promises[i]
                promise.then(
                    (res) => {
                        arr[i] = res
                        num++
                        if (num === len) resolve(arr)
                    },
                    (err) => { // 一旦有元素 reject 直接 reject出失败原因
                        reject(err)
                    }
                )
            }
        })
    }

    // 接收一个 全是promise对象的数组 会将所有promise对象全部执行 同时返回一个新的promise对象 resolve 出来一个数组 里面的元素为一个个对象 对象内容为 {status: 元素的state状态, value/reason: resolve值/reject原因}
    static allSettled(promises) {
        return new myPromise((resolve, reject) => {
            const len = promises.length
            const arr = new Array(len)
            let num = 0
            for (let i = 0; i < len; i++) {
                const promise = promises[i]
                promise.then(
                    (value) => {
                        arr[i] = { status: 'fulfilled', value: value }
                        num++
                        if (num === len) resolve(arr)
                    },
                    (reason) => {
                        arr[i] = { status: 'rejected', reason: reason }
                        num++
                        if (num === len) resolve(arr)
                    }
                )
                // 可以接finally 上面就不用做重复操作了
            }
        })
    }

    // 接收一个 全是promise对象的数组 会将所有promise对象全部执行 同时返回一个新的promise对象 会 resolve 出来最先resolve成功的元素的结果 如果所有元素都 reject 那么最后会 reject出一个数组形如
    // err: [AggregateError: All promises were rejected] {
    // [errors]: [reason1 , reason2, reason3]
    // }
    static any(promises) {
        return new myPromise((resolve, reject) => {
            const len = promises.length
            const arr = new Array(len)
            let num = 0
            for (let i = 0; i < len; i++) {
                const promise = promises[i]
                promise.then(
                    (value) => {
                        resolve(value)
                    },
                    (reason) => {
                        arr[i] = reason
                        num++
                        if (num === len) {
                            reject(new AggregateError(arr, 'All promises were rejected'))
                        }
                    }
                )
            }
        })
    }

    // 创建一个 fulfilled 状态的 promise 对象
    static resolve(value) {
        return new myPromise((resolve) => resolve(value))
    }

    // 创建一个 rejected 状态的 promise 对象
    static reject(reason) {
        return new myPromise((resolve, reject) => reject(reason))
    }

    // 等同于在一个promise对象后面加上一个.then(null, onRejected)
    catch(onRejected) {
        return this.then(null, onRejected)
    }

    // 返回一个 promise 对象 传递 调用它的promise对象所 传递的resolve值 或 抛出 调用它的promise对象抛出的错误
    // 透传原始值 处理 callback 返回的 Promise
    finally(callback) {
        return this.then(
            (value) => {
                const result = callback()
                // 如果 callback 返回 Promise 等待其完成后传递原始值
                // 不用管 result 这个promise对象的结果 等其完成后 继续传递上个promise对象传递的原始值
                if (result instanceof myPromise) return result.then(() => value)
                return value
            },
            (reason) => {
                const result = callback()
                if (result instanceof myPromise) return result.then(() => {throw reason})
                throw reason
            }
        )
    }
}

// function foo1() {
//     return new myPromise((resolve, reject) => {
//         console.log('foo1');
//         // resolve('foo1成功')
//         reject('foo1失败')
//         console.log('foo1执行完毕');
//     })
// }
// function foo2() {
//     return new myPromise((resolve, reject) => {
//         console.log('foo2');
//         // resolve('foo2成功')
//         reject('foo2失败')
//         console.log('foo2执行完毕');
//     })
// }

// foo1()
//     .then(
//         (res) => {
//             console.log(`成功1：${res}`);
//             // return foo2()
//             // return ('then1成功')
//         },
//         (err) => {
//             console.log(`失败1: ${err}`);
//             // return foo2()
//             return ('then1失败')
//         }
//     )
//     .then(
//         (res) => {
//             console.log(`成功2：${res}`);
//             return res
//         },
//         (err) => {
//             console.log(`失败2: ${err}`);

//         }
// )


// 当 resolve 一个 Promise 时，需要等待该 Promise 的状态确定
// const promise1 = new myPromise(resolve => {
//     const promise2 = new myPromise(resolve2 => {
//         setTimeout(() => resolve2('最终结果'), 1000)
//     })
//     resolve(promise2) // 这里传入了一个 Promise
// })

// promise1.then(value => {
//     console.log(value) // 输出：'最终结果'（而不是 Promise 对象）
// })


function A() {
    return new myPromise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            reject('A fail')
            resolve('A success')
        }, 1500)
    })
}
function B() {
    return new myPromise((resolve, reject) => {
        setTimeout(() => {
            console.log('B');
            reject('B fail')
            resolve('B success')
        }, 500)
    })
}
function C() {
    return new myPromise((resolve, reject) => {
        setTimeout(() => {
            console.log('C');
            reject('C fail')
            resolve('C success')
        }, 1000)
    })
}

// myPromise.race([A(), B(), C()])
//     .then(
//         (res) => {
//             console.log(res)
//         },
//         (err) => {
//             console.log(err)
//         }
//     )
// myPromise.all([A(), B(), C()])
//     .then(
//         (res) => {
//             console.log(res)
//         },
//         (err) => {
//             console.log(err)
//         }
// )
// myPromise.allSettled([A(), B(), C()])
//     .then(
//         (res) => {
//             console.log('res:',res)
//         },
//         (err) => {
//             console.log('err:',err)
//         }
//     )
// myPromise.any([A(), B(), C()])
//     .then(
//         (res) => {
//             console.log('res:', res)
//         },
//         (err) => {
//             console.log('err:', err)
//         }
//     )


// myPromise.resolve(666).then(value => { console.log(value) }
// )

// myPromise.reject(555).then((value) => {
//     console.log(value);

// }).catch((reason) => {
//      console.log('err:',reason);

//  })



// myPromise.resolve('原始值')
//     .finally((res) => {
//         console.log(111, res); // undefined

//         return '新值'; // 这个返回值会被忽略
//     })
//     .then(value => {
//         console.log(value); // 输出: '原始值'
//     });


// myPromise.resolve('成功')
//     .finally(() => {
//         throw new Error('finally 中的错误');
//     })
//     .catch(error => {
//         console.log(error.message); // 输出: 'finally 中的错误'
//     });


myPromise.resolve('成功')
    .finally(() => {
        // return myPromise.reject('finally 拒绝');
        return myPromise.resolve('finally 接收')
    })
    .then(value => {
        console.log(value);
        
    })
    .catch(error => {
        console.log(error); // 输出: 'finally 拒绝'
    });