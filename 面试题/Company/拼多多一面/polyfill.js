if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined')
        }
        const o = Object(this)
        const len = o.length >>> 0
        if (len === 0) {
            return false
        }
        let n = fromIndex | 0
        if (n < 0) {
            n = Math.max(len + n, 0)
        }
        while (n < len) {
            if (o[n] === searchElement) {
                return true
            }
            n++
        }
        return false
    }
}