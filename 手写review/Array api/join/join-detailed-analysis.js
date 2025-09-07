// Array.join 方法深度原理分析
console.log('=== Array.join 方法深度原理分析 ===\n');

// 1. 标准实现（完全符合ECMAScript规范）
Array.prototype.standardJoin = function(separator) {
    // 1. 处理 this 值
    const O = Object(this);
    
    // 2. 获取长度
    const len = parseInt(O.length) || 0;
    
    // 3. 处理分隔符
    let sep;
    if (separator === undefined) {
        sep = ',';
    } else {
        sep = String(separator);
    }
    
    // 4. 构建结果
    let result = '';
    
    for (let k = 0; k < len; k++) {
        if (k > 0) {
            result += sep;
        }
        
        // 检查属性是否存在（处理稀疏数组）
        if (k in O) {
            const element = O[k];
            
            // null 和 undefined 转为空字符串
            if (element === null || element === undefined) {
                // 跳过，不添加任何内容
            } else {
                result += String(element);
            }
        }
    }
    
    return result;
};

// 2. 性能对比测试
console.log('=== 性能对比测试 ===');

const testCases = [
    { name: '小数组', arr: [1, 2, 3, 4, 5] },
    { name: '中等数组', arr: Array(1000).fill(0).map((_, i) => i % 10) },
    { name: '大数组', arr: Array(10000).fill(0).map((_, i) => i) },
    { name: '稀疏数组', arr: Array(1000).fill(0).map((_, i) => i % 5 === 0 ? i : undefined).filter(x => x !== undefined) },
    { name: '混合类型', arr: [1, 'hello', true, null, undefined, {a: 1}, [1, 2, 3]] }
];

testCases.forEach(({ name, arr }) => {
    console.log(`\n${name} (${arr.length}个元素):`);
    
    console.time('原生 join');
    const native = arr.join(',');
    console.timeEnd('原生 join');
    
    console.time('标准实现');
    const standard = arr.standardJoin(',');
    console.timeEnd('标准实现');
    
    console.log(`结果一致: ${native === standard}`);
});

// 3. 边界情况测试
console.log('\n=== 边界情况测试 ===');

const edgeCases = [
    // 空数组
    { desc: '空数组', arr: [] },
    
    // 单元素数组
    { desc: '单元素数组', arr: [42] },
    
    // null 和 undefined 元素
    { desc: 'null 和 undefined', arr: [null, undefined, null] },
    
    // 稀疏数组
    { desc: '稀疏数组', arr: Array(5) },
    
    // 类数组对象
    { desc: '类数组对象', obj: { 0: 'a', 1: 'b', 2: 'c', length: 3 } },
    
    // 字符串
    { desc: '字符串', str: 'hello' },
    
    // 复杂对象
    { desc: '复杂对象', arr: [{toString: () => 'custom'}, new Date(), /test/] }
];

edgeCases.forEach(({ desc, arr, obj, str }) => {
    const target = arr || obj || str;
    console.log(`\n${desc}:`);
    console.log(`输入: ${JSON.stringify(target)}`);
    console.log(`原生: "${Array.prototype.join.call(target, '-')}"`);
    console.log(`手写: "${Array.prototype.standardJoin.call(target, '-')}"`);
});

// 4. 分隔符特性测试
console.log('\n=== 分隔符特性测试 ===');

const separators = [
    ',',           // 默认
    '-',           // 单字符
    '---',         // 多字符
    '',            // 空字符串
    '🔥',          // 特殊字符
    '<br>',        // HTML
    '\n',          // 换行符
    null,          // null
    undefined      // undefined
];

const testArr = [1, 2, 3, 4, 5];

separators.forEach(sep => {
    console.log(`\n分隔符: ${JSON.stringify(sep)}`);
    console.log(`原生: "${testArr.join(sep)}"`);
    console.log(`手写: "${testArr.standardJoin(sep)}"`);
});

// 5. 内存和性能优化技巧
console.log('\n=== 性能优化技巧 ===');

// 5.1 预分配内存版本
Array.prototype.optimizedJoin = function(separator) {
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    const sep = separator === undefined ? ',' : String(separator);
    
    if (len === 0) return '';
    if (len === 1) {
        return (0 in O) ? String(O[0] ?? '') : '';
    }
    
    // 预估算结果大小
    let estimatedSize = 0;
    const parts = [];
    
    for (let k = 0; k < len; k++) {
        if (k in O) {
            const str = String(O[k] ?? '');
            parts.push(str);
            estimatedSize += str.length;
        } else {
            parts.push('');
        }
    }
    
    estimatedSize += sep.length * (len - 1);
    
    // 使用数组连接（现代引擎优化）
    return parts.join(sep);
};

// 5.2 性能测试
console.log('\n=== 优化性能测试 ===');
const perfArr = Array(10000).fill(0).map((_, i) => `item_${i}`);

console.time('原生 join');
perfArr.join(',');
console.timeEnd('原生 join');

console.time('标准实现');
perfArr.standardJoin(',');
console.timeEnd('标准实现');

console.time('优化实现');
perfArr.optimizedJoin(',');
console.timeEnd('优化实现');

// 6. 实际应用场景
console.log('\n=== 实际应用场景 ===');

// 6.1 URL 参数拼接
const params = { name: '张三', age: 25, city: '北京' };
const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
console.log('URL参数:', queryString);

// 6.2 CSV 格式生成
const csvData = [
    ['姓名', '年龄', '城市'],
    ['张三', 25, '北京'],
    ['李四', 30, '上海'],
    ['王五', 28, '广州']
];

const csvContent = csvData
    .map(row => row.join(','))
    .join('\n');
console.log('CSV内容:');
console.log(csvContent);

// 6.3 HTML 列表生成
const items = ['苹果', '香蕉', '橙子'];
const htmlList = `<ul>\n${items.map(item => `  <li>${item}</li>`).join('\n')}\n</ul>`;
console.log('HTML列表:');
console.log(htmlList);

// 6.4 SQL IN 子句
const ids = [1, 2, 3, 4, 5];
const sqlInClause = `SELECT * FROM users WHERE id IN (${ids.join(',')})`;
console.log('SQL查询:', sqlInClause);

// 7. 高级特性演示
console.log('\n=== 高级特性演示 ===');

// 7.1 自定义 toString 方法
const customObjects = [
    { toString: () => '对象1' },
    { toString: () => '对象2' },
    { toString: () => '对象3' }
];
console.log('自定义对象:', customObjects.join(' | '));

// 7.2 多维数组扁平化连接
const nestedArray = [[1, 2], [3, 4], [5, 6]];
console.log('多维数组:', nestedArray.map(arr => arr.join('')).join('-'));

// 7.3 模板字符串对比
const templateTest = ['Hello', 'World', 'JavaScript'];
console.log('join vs 模板字符串:');
console.log('join:', templateTest.join(' '));
console.log('模板:', `${templateTest[0]} ${templateTest[1]} ${templateTest[2]}`);

// 8. 错误处理和边界情况
console.log('\n=== 错误处理 ===');

try {
    // 测试各种异常情况
    console.log('非数组对象:', Array.prototype.join.call({a: 1}, ','));
    console.log('null:', Array.prototype.join.call(null, ','));
    console.log('undefined:', Array.prototype.join.call(undefined, ','));
    console.log('数字:', Array.prototype.join.call(123, ','));
    console.log('布尔值:', Array.prototype.join.call(true, ','));
} catch (e) {
    console.log('错误:', e.message);
}

// 9. join 方法完整规范实现
console.log('\n=== ECMAScript 规范实现 ===');

Array.prototype.specJoin = function(separator) {
    // 1. Let O be ? ToObject(this value)
    const O = Object(this);
    
    // 2. Let len be ? LengthOfArrayLike(O)
    const len = Math.max(0, Math.min(parseInt(O.length) || 0, 2**32 - 1));
    
    // 3. If separator is undefined, let sep be the single-element String ",".
    // 4. Else, let sep be ? ToString(separator)
    const sep = separator === undefined ? ',' : String(separator);
    
    // 5. Let R be the empty String
    let R = '';
    
    // 6. Let k be 0
    let k = 0;
    
    // 7. Repeat, while k < len
    while (k < len) {
        // a. If k > 0, set R to the string-concatenation of R and sep
        if (k > 0) {
            R += sep;
        }
        
        // b. Let element be ? Get(O, ! ToString(𝔽(k)))
        let element;
        if (k in O) {
            element = O[k];
            
            // c. If element is undefined or null, let next be the empty String
            // d. Else, let next be ? ToString(element)
            if (element !== null && element !== undefined) {
                R += String(element);
            }
        }
        
        // e. Set R to the string-concatenation of R and next
        // f. Set k to k + 1
        k++;
    }
    
    // 8. Return R
    return R;
};

// 验证规范实现
console.log('规范实现验证:');
console.log('[1,2,3]:', [1, 2, 3].specJoin(','));
console.log('空数组:', [].specJoin(','));
console.log('稀疏数组:', [1,,3].specJoin('-'));