// 使用数组实现
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity
    this.cache = []
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    let resIndex = this.cache.findIndex(item => item[0] === key)
    if (resIndex !== -1) {
        let temp = this.cache[resIndex]
        this.cache.splice(resIndex, 1)
        this.cache.push(temp)
        return temp[1]
    }
    return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const index = this.cache.findIndex(item => item[0] === key)
    if (index !== -1) {
        this.cache.splice(index, 1)
    }
    this.cache.push([key, value])
    if (this.cache.length > this.capacity) {
        this.cache.shift()
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */