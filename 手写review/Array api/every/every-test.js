// every 方法正确性测试
console.log('=== every 方法正确性测试 ===\n');

// 当前实现
Array.prototype.myEveryCurrent = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }

    const O = Object(this)
    const len = parseInt(O.length) || 0

    for (let i = 0; i < len; i++)  {
        if (i in O) {
            if (!callback.call(thisArg, O[i], i, O)) {
                return false
            }
        }
    }
    return true
}

// 改进版本（更完善）
Array.prototype.myEveryImproved = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }

    const O = Object(this)
    const len = parseInt(O.length) || 0

    for (let i = 0; i < len; i++)  {
        if (i in O) {
            if (!callback.call(thisArg, O[i], i, O)) {
                return false
            }
        }
    }
    return true
}

// 测试数据
const testCases = [
    [2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5],
    [],
    [1],
    [1, 2, , 4, 5] // 稀疏数组
];

// 测试条件
const conditions = [
    { name: '所有元素 > 0', fn: x => x > 0 },
    { name: '所有元素 > 2', fn: x => x > 2 },
    { name: '所有元素 < 10', fn: x => x < 10 },
    { name: '所有元素是数字', fn: x => typeof x === 'number' }
];

console.log('=== 对比测试结果 ===');
testCases.forEach((arr, index) => {
    console.log(`\n测试数组 ${index + 1}:`, arr);
    
    conditions.forEach(({name, fn}) => {
        console.log(`${name}:`);
        console.log(`原生 every: ${arr.every(fn)}`);
        console.log(`当前实现: ${arr.myEveryCurrent(fn)}`);
        console.log(`改进实现: ${arr.myEveryImproved(fn)}`);
    });
});

console.log('\n=== 类数组测试 ===');
const arrayLike = { 0: 2, 1: 3, 2: 4, length: 3 };
console.log('类数组对象:', arrayLike);
console.log('原生 every.call:', Array.prototype.every.call(arrayLike, x => x > 1)); // true
console.log('当前实现.call:', Array.prototype.myEveryCurrent.call(arrayLike, x => x > 1)); // true

console.log('\n=== 边界测试 ===');
console.log('空数组 every:', [].every(x => x > 0)); // true
console.log('空数组 myEveryCurrent:', [].myEveryCurrent(x => x > 0)); // true

console.log('\n=== 稀疏数组测试 ===');
const sparse = [1, , 3, , 5];
console.log('稀疏数组:', sparse);
console.log('跳过空位:', sparse.every(x => x > 0)); // true
console.log('当前实现跳过空位:', sparse.myEveryCurrent(x => x > 0)); // true