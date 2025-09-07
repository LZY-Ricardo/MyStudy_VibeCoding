// some 方法正确性测试
console.log('=== some 方法正确性测试 ===\n');

// ❌ 错误的实现（当前代码）
Array.prototype.mySomeWrong = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }
    for (let i = 0; i < this.length; i++) {
        if (!callback.call(thisArg, this[i], i, this)) {
            return false    // ❌ 逻辑错误
        }
    }
    return true  // ❌ 逻辑错误
}

// ✅ 正确的实现
Array.prototype.mySomeCorrect = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }
    
    // 处理类数组对象
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                return true    // ✅ 找到符合条件的立即返回true
            }
        }
    }
    return false  // ✅ 都没找到返回false
}

// 测试数据
const testArr = [1, 2, 3, 4, 5];

console.log('测试数据:', testArr);

// 测试用例
const testCases = [
    { name: '是否有大于3的数', fn: x => x > 3 },
    { name: '是否有大于5的数', fn: x => x > 5 },
    { name: '是否有偶数', fn: x => x % 2 === 0 },
    { name: '是否有负数', fn: x => x < 0 }
];

console.log('\n=== 对比测试结果 ===');
testCases.forEach(({name, fn}) => {
    console.log(`\n${name}:`);
    console.log(`原生 some: ${testArr.some(fn)}`);
    console.log(`错误实现: ${testArr.mySomeWrong(fn)}`);
    console.log(`正确实现: ${testArr.mySomeCorrect(fn)}`);
});

console.log('\n=== 稀疏数组测试 ===');
const sparseArr = [1, , 3, , 5]; // 稀疏数组
console.log('稀疏数组:', sparseArr);

console.log('\n原生 some (跳过空位):', sparseArr.some(x => x > 2)); // true
console.log('正确实现 (跳过空位):', sparseArr.mySomeCorrect(x => x > 2)); // true

console.log('\n=== 类数组测试 ===');
const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
console.log('类数组对象:', arrayLike);

console.log('\n原生 some.call:', Array.prototype.some.call(arrayLike, x => x > 2)); // true
console.log('正确实现.call:', Array.prototype.mySomeCorrect.call(arrayLike, x => x > 2)); // true