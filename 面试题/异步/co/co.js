const co = require('co')

function asyncFunction(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num === 1) {
                reject('num不能为1')    
            }
            resolve(num)
        }, 1000)
    })
}

function* generatorFunction() {
    const result1 = yield asyncFunction(1)
    const result2 = yield asyncFunction(2)
    return result1 + result2
}

co(generatorFunction)
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})