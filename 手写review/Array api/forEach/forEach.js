Array.prototype.myForEach = function (callback) { // 精简版
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this)
    }
}

Array.prototype.myForEach = function (callback, thisArg) {
    // 类型检查
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    // 处理稀疏数组
    for (let i = 0; i < this.length; i++) {
        if (i in this) {  // 只处理存在的元素
            callback.call(thisArg, this[i], i, this);
        }
    }
}

let arr = [1, 2, 3, 4, 5, 6]

arr.myForEach((item, index, arr) => {
    console.log(item, index, arr);
    arr[index] = item * 2
})
console.log(arr);

let arr1 = [1, , 2, , , 5]
arr1.myForEach((item, index, arr) => {
    console.log(item, index, arr);
    arr[index] = item * 2
})
console.log(arr1);