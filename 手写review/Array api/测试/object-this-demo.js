// 演示 Object(this) 的作用
console.log('=== Object(this) 作用演示 ===\n');

// 1. 数组的情况
const arr = [1, 2, 3];
console.log('原始数组:', arr);
console.log('Object(arr):', Object(arr));
console.log('类型:', typeof Object(arr), Array.isArray(Object(arr)));

// 2. 字符串的情况
const str = "hello";
console.log('\n原始字符串:', str);
console.log('Object(str):', Object(str));
console.log('访问属性:', Object(str)[0], Object(str).length);

// 3. 类数组对象
const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
console.log('\n类数组对象:', arrayLike);
console.log('Object(arrayLike):', Object(arrayLike));

// 4. 实际应用：自定义 map 方法
Array.prototype.customMap = function(callback) {
    console.log('\n=== 自定义 map 处理过程 ===');
    
    // 关键：使用 Object(this) 处理各种类型
    const O = Object(this);
    console.log('转换后的对象:', O);
    
    const len = parseInt(O.length) || 0;
    const result = [];
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            console.log(`处理索引 ${i}: ${O[i]}`);
            result.push(callback(O[i], i, O));
        }
    }
    
    return result;
};

// 测试不同输入
console.log('\n=== 测试不同输入类型 ===');

// 测试数组
const arrResult = [1, 2, 3].customMap(x => x * 2);
console.log('数组结果:', arrResult);

// 测试字符串
const strResult = Array.prototype.customMap.call("abc", char => char.toUpperCase());
console.log('字符串结果:', strResult);

// 测试类数组对象
const objResult = Array.prototype.customMap.call(arrayLike, item => item + '!');
console.log('类数组结果:', objResult);