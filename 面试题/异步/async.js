function co(generatorFunction) {
    if (typeof generatorFunction !== 'function') { // 类型检查
        return Promise.reject(new TypeError('参数必须是生成器函数'))
    }
    return new Promise((resolve, reject) => {
        const g = generatorFunction() // 得到一个可迭代对象/迭代器
        // 定义一个递归函数 用来执行 Generator 函数
        function next(value) {
            try {
                const { value: result, done } = g.next(value)
                if (done) {
                    resolve(result)
                } else { // 这里使用 promise 对象 就是为了防止 result 是promise对象还没有解析而获得一个等待状态的promise对象 为了等它执行完毕防止得到一个promise对象而不是它的执行结果
                    Promise.resolve(result) // 异步等待机制
                        .then(next)
                        .catch((err) => {
                            try {
                                const { value: result, done } = g.throw(err)
                                // 如果执行到这里，说明 Generator 内部捕获了错误
                                // 继续执行 Generator 函数
                                if (done) {
                                    resolve(result)
                                    // Generator 完成，返回处理后的结果
                                } else {
                                    Promise.resolve(result).then(next).catch(reject) // 这里走进 catch 为next函数处理异步结果时发生错误 是 co 函数的最终错误的兜底机制 确保未处理的错误能正确传播
                                }
                            } catch (e) {
                                // 如果执行到这里，说明 Generator 内部没有捕获错误
                                // 直接将错误抛出 Generator不再执行
                                reject(e) // 直接拒绝整个 co 函数的 Promise
                            }
                        })
                }
            } catch (e) {
                // 如果执行到这里，说明 Generator 外部捕获了错误
                // 直接将错误抛出 Generator不再执行
                // 比如 Generator 内部直接抛出错误 throw new Error('错误') 或者 有语法错误
                // 这个错误不是通过 Promise的 reject 传递 而是同步抛出的 会被这里捕获到 
                // 直接拒绝整个 co 函数的 Promise
                reject(e)
            }
        }

        next() // 启动执行
    })
}

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

// 带有错误处理的生成器函数
function* generatorWithErrorHandling() {
    try {
        const result1 = yield asyncFunction(1) // 这里会抛出错误
        console.log('这行不会执行');
    } catch (e) {
        console.log('Generator 内部捕获到错误:', e);
        // 错误被捕获后，继续执行
        const result2 = yield asyncFunction(2)
        return result2 * 10 // 返回处理后的结果
    }
}

console.log('=== 测试1: Generator 内部没有错误处理 ===');
co(generatorFunction)
    .then((res) => {
        console.log('成功结果:', res);
    })
    .catch((err) => {
        console.log('co 函数捕获到错误:', err);
    })

setTimeout(() => {
    console.log('\n=== 测试2: Generator 内部有错误处理 ===');
    co(generatorWithErrorHandling)
        .then((res) => {
            console.log('成功结果:', res);
        })
        .catch((err) => {
            console.log('co 函数捕获到错误:', err);
        })
}, 2000)