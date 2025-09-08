function co(generatorFunction) {
    if (typeof generatorFunction !== 'function') { // 类型检查
        return Promise.reject(new TypeError('参数必须是生成器函数'))
    }
    return new Promise((resolve, reject) => {
        try {
            const iterator = generatorFunction()

            function next(value) {
                const { value: result, done } = iterator.next(value)
                if (done) {
                    resolve(result)
                } else {
                    Promise.resolve(result)
                        .then(next) // .then((value) => next(value))
                        .catch((error) => {
                            try {
                                const { value: result, done } = iterator.throw(error)
                                if (done) {
                                    resolve(result)
                                } else {
                                    Promise.resolve(result)
                                        .then(next)
                                        .catch(reject) // 等价于 .catch((error) => reject(error))
                                }
                            } catch (error) {
                                reject(error)
                            }
                        })
                }
            }

            // 执行next 进行首次迭代
            next()
        } catch (error) {
            reject(error)
        }
    })
}