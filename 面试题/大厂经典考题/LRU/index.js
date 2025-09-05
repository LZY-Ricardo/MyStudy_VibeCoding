/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity
    this.cache = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.cache.has(key)) { // 存在则删除
        const value = this.cache.get(key) // 获取值
        this.cache.delete(key) // 删除旧的
        this.cache.set(key, value) // 添加到末尾
        return value
    }
    return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) { // 存在则删除
        this.cache.delete(key)
    }
    this.cache.set(key, value) // 进行添加操作
    if (this.cache.size > this.capacity) { // 超过容量则删除最久未使用的
        let oldKey = this.cache.keys().next().value // 获取最久未使用的key
        this.cache.delete(oldKey) // 删除最久未使用的key
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */