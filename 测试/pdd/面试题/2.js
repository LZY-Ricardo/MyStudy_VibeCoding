Promise.prototype.finally = function (callback) {
    return this.then(
        (value) => {
            return Promise.resolve(callback()).then(() => {
                return value
            })
        },
        (reason) => {
            return Promise.resolve(callback()).then(() => {
                throw reason
            })
        }
    )
}