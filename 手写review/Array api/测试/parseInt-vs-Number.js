// parseInt 与 Number 的区别详解
console.log('=== parseInt vs Number 对比 ===\n');

// 测试数据
const testCases = [
    // 字符串
    '123',
    '123.45',
    '123abc',
    'abc123',
    '  123  ',
    '',
    '0x10', // 十六进制
    '0b101', // 二进制
    '0o10',  // 八进制
    
    // 其他类型
    123,
    123.45,
    true,
    false,
    null,
    undefined,
    [],
    [123],
    [1,2,3],
    {},
    'Infinity',
    'NaN'
];

console.log('输入值 | parseInt() | Number() | 说明');
console.log('------|------------|----------|------');

testCases.forEach(input => {
    const parseIntResult = parseInt(input);
    const numberResult = Number(input);
    
    let explanation = '';
    
    // 特殊情况的解释
    if (typeof input === 'string') {
        if (input.includes('abc')) {
            explanation = input.startsWith('123') ? 'parseInt提取到非数字停止' : 'Number要求完全数字';
        } else if (input === '') {
            explanation = 'parseInt:空字符串为NaN, Number:空字符串为0';
        } else if (input.startsWith('0x')) {
            explanation = 'parseInt识别十六进制, Number也识别';
        }
    } else if (input === null) {
        explanation = 'parseInt:null为NaN, Number:null为0';
    } else if (input === true) {
        explanation = 'parseInt:布尔值为NaN, Number:true为1';
    } else if (Array.isArray(input)) {
        explanation = input.length === 1 ? '数组先转字符串再处理' : '多元素数组转字符串再处理';
    }
    
    console.log(`${JSON.stringify(input)} | ${parseIntResult} | ${numberResult} | ${explanation}`);
});

console.log('\n=== 进制处理差异 ===');
console.log('parseInt("0x10"):', parseInt('0x10')); // 16
console.log('Number("0x10"):', Number('0x10'));   // 16
console.log('parseInt("0x10", 16):', parseInt('0x10', 16)); // 16 - 指定进制
console.log('parseInt("10", 2):', parseInt('10', 2));     // 2 - 二进制

console.log('\n=== 浮点数处理 ===');
console.log('parseInt("123.45"):', parseInt('123.45')); // 123 - 只取整数部分
console.log('Number("123.45"):', Number('123.45'));     // 123.45 - 保留小数

console.log('\n=== 实际应用场景 ===');

// 场景1：用户输入处理
const userInput = '123.5px';
console.log('用户输入 "123.5px":');
console.log('- 提取数字用 parseInt:', parseInt(userInput)); // 123
console.log('- 完整转换用 Number:', Number(userInput));   // NaN

// 场景2：数组长度处理
const arrayLike = { length: '5' };
console.log('类数组长度处理:');
console.log('- parseInt(arrayLike.length):', parseInt(arrayLike.length)); // 5
console.log('- Number(arrayLike.length):', Number(arrayLike.length));   // 5

// 场景3：空值处理
console.log('空值处理:');
console.log('- parseInt(""):', parseInt(''));     // NaN
console.log('- Number(""):', Number(''));       // 0
console.log('- parseInt(null):', parseInt(null)); // NaN
console.log('- Number(null):', Number(null));   // 0