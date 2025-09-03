function co(generatorFunction) {
    return new Promise((resolve, reject) => {
        const g = generatorFunction() // 得到一个可迭代对象/迭代器
        
        (function next(value) {
            const {value: result, done} = g.next(value)
            if (done) {
                resolve(result)
            } else {
                Promise.resolve(result)
                .then(next)
                .catch((err) => {
                    g.throw(err)
                })
            } 
        })()
    })
}