// 普通实现 可以处理稀疏数组 也能写第二个参数 处理this指向
Array.prototype.myMap = function (callback, thisArg) { 
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }
    const len = this.length
    const res = new Array(len)
    for (let i = 0; i < len; i++) {
        if (i in this) { // 跳过空位
            res[i] = callback.call(thisArg, this[i], i, this)
        }
    }
    return res
}

Array.prototype.myMap = function (callback, thisArg) { // 完整实现 (可以处理类数组)
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }

    // 使用 call 处理类数组对象
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    const res = new Array(len);

    for (let i = 0; i < len; i++) {
        if (i in O) {
            res[i] = callback.call(thisArg, O[i], i, O);
        }
    }
    return res;
}

// let arr = [1, 2, 3, 4, 5]
// let newArr = arr.myMap((item, index, arr) => {
//     console.log(item, index, arr);
//     return item*2
// })
// console.log(newArr);

let arr1 = [1, , 2, , , 5]
let newArr1 = arr1.myMap((item, index, arr) => {
    console.log(item, index, arr);
    return item * 2
})
console.log(newArr1);


const arrayLike = {
    0: 'hello',
    1: 'world',
    2: 'javascript',
    length: 3
};
let newArr2 = Array.prototype.myMap.call(arrayLike, (item) => {
    console.log(item);
    return item.toUpperCase()
})
console.log(newArr2);

