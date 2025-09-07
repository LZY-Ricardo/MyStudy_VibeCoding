// join 方法原理详解
console.log('=== Array.join 方法原理详解 ===\n');

// 1. 手写 join 方法实现
Array.prototype.myJoin = function(separator = ',') {
    // 处理类数组对象
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    
    // 将分隔符转为字符串
    const sep = separator === undefined ? ',' : String(separator);
    
    let result = '';
    
    for (let i = 0; i < len; i++) {
        if (i > 0) {
            result += sep; // 添加分隔符
        }
        
        if (i in O) {
            const element = O[i];
            // 处理 null 和 undefined
            if (element === null || element === undefined) {
                // 跳过，不添加任何内容
            } else {
                result += String(element);
            }
        }
    }
    
    return result;
};

// 2. 对比测试
const testArrays = [
    [1, 2, 3, 4, 5],
    ['a', 'b', 'c'],
    [1, null, 3, undefined, 5],
    [true, false, null],
    [],
    [1],
    [1, 2, , 4, 5], // 稀疏数组
    [{a: 1}, {b: 2}],
    [new Date(), null]
];

console.log('=== 对比测试结果 ===');
testArrays.forEach(arr => {
    console.log(`\n数组: ${JSON.stringify(arr)}`);
    console.log(`原生 join(): "${arr.join()}"`);
    console.log(`手写 join(): "${arr.myJoin()}"`);
    console.log(`join('-'): "${arr.join('-')}"`);
    console.log(`手写 join('-'): "${arr.myJoin('-')}"`);
});

// 3. 特殊场景测试
console.log('\n=== 特殊场景测试 ===');

// 3.1 空数组
console.log('空数组:');
console.log('[] 原生:', [].join());
console.log('[] 手写:', [].myJoin());

// 3.2 null 和 undefined
console.log('\nnull 和 undefined 处理:');
console.log('[null, undefined] 原生:', [null, undefined].join('-'));
console.log('[null, undefined] 手写:', [null, undefined].myJoin('-'));

// 3.3 对象和日期
console.log('\n对象转换:');
const objArr = [{a: 1}, new Date('2024-01-01')];
console.log('对象数组 原生:', objArr.join());
console.log('对象数组 手写:', objArr.myJoin());

// 3.4 稀疏数组
console.log('\n稀疏数组:');
const sparse = [1, , 3, , 5];
console.log('稀疏数组 原生:', sparse.join('-'));
console.log('稀疏数组 手写:', sparse.myJoin('-'));

// 4. join 方法核心原理总结
console.log('\n=== join 方法核心原理 ===');
console.log(`
1. **基本流程**:
   - 获取数组长度
   - 将分隔符转为字符串（默认为逗号）
   - 遍历数组元素
   - 将每个元素转为字符串（null/undefined 转为空字符串）
   - 用分隔符连接所有字符串

2. **关键特性**:
   - 空数组返回空字符串
   - null 和 undefined 会被忽略（转为空字符串）
   - 稀疏数组会跳过空位
   - 分隔符可以是任意字符串
   - 所有元素都会调用 String() 转换

3. **性能考虑**:
   - 字符串拼接比数组连接更高效
   - 可以提前计算结果长度
   - 避免频繁的字符串创建
`);

// 5. 性能优化版本
Array.prototype.myJoinOptimized = function(separator = ',') {
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    const sep = String(separator);
    
    // 使用数组收集结果，最后一次性连接
    const parts = [];
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            const element = O[i];
            parts.push(element == null ? '' : String(element));
        } else {
            parts.push(''); // 稀疏数组空位
        }
    }
    
    return parts.join(sep);
};

console.log('\n=== 性能优化版本测试 ===');
const largeArr = Array(1000).fill(0).map((_, i) => i);
console.time('原生 join');
largeArr.join(',');
console.timeEnd('原生 join');

console.time('手写 join');
largeArr.myJoin(',');
console.timeEnd('手写 join');

console.time('优化 join');
largeArr.myJoinOptimized(',');
console.timeEnd('优化 join');