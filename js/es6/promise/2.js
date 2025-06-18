function xq() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('胡总相亲牵手成功')
            resolve() // 成功状态
            // reject() // 失败
        }, 1000)
    })
}

function marry() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('胡总结婚了')
            resolve()
        }, 2000)
    })
}

function baby() {
    setTimeout(() => {
        console.log('小胡出生')
    }, 500)
}

// 1. 执行 xq 函数, 立即返回一个 promise 实例对象, 但是此时该对象的状态时 pending(等待状态)
// 2. .then 立即触发, 但是 then 里面的回调函数没有触发
// 3. 等待 xq 函数里面的resolve()执行完毕, 此时实例对象的状态会变更为 fulfilled (成功状态) 此时 .then 函数里面的回调函数才会触发
xq() // 里面执行到了 resolve()
.then(() => {   // then 的源码里面也返回了一个 promise 实例对象, 状态默认继承 xq 函数返回的对象的状态
    return marry()
})
.then(() => {   // 保证第一个 then 返回的对象状态继承于 marry 函数返回的对象状态
    baby()
})
.catch(() => {
    console.log('相亲失败')
})
