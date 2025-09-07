// 类数组对象处理示例

// 1. 自定义类数组对象
const arrayLike = {
    0: 'hello',
    1: 'world', 
    2: 'javascript',
    length: 3
};

console.log('=== 原始类数组对象 ===');
console.log(arrayLike); // {0: 'hello', 1: 'world', 2: 'javascript', length: 3}
console.log('是否是数组:', Array.isArray(arrayLike)); // false

// 2. 使用原生 map 处理类数组
console.log('\n=== 原生 Array.prototype.map.call ===');
const result1 = Array.prototype.map.call(arrayLike, (item, index) => {
    console.log(`处理索引 ${index}: ${item}`);
    return item.toUpperCase();
});
console.log('转换结果:', result1); // ['HELLO', 'WORLD', 'JAVASCRIPT']

// 3. 使用自定义 myMap 处理类数组
Array.prototype.myMap = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`)
    }
    
    // 关键：使用 Object(this) 处理类数组
    const O = Object(this);
    const len = parseInt(O.length) || 0;
    const res = new Array(len);
    
    for (let i = 0; i < len; i++) {
        if (i in O) {
            res[i] = callback.call(thisArg, O[i], i, O);
        }
    }
    return res;
};

console.log('\n=== 自定义 myMap 处理类数组 ===');
const result2 = Array.prototype.myMap.call(arrayLike, (item, index) => {
    console.log(`处理索引 ${index}: ${item}`);
    return item.length; // 返回每个字符串的长度
});
console.log('字符串长度结果:', result2); // [5, 5, 10]

// 4. 处理 arguments 对象
console.log('\n=== 处理 arguments 对象 ===');
function processArguments() {
    console.log('arguments:', arguments);
    console.log('是否是数组:', Array.isArray(arguments)); // false
    
    const doubled = Array.prototype.myMap.call(arguments, num => num * 2);
    console.log('翻倍结果:', doubled);
    return doubled;
}

processArguments(1, 2, 3, 4, 5); // [2, 4, 6, 8, 10]

// 5. 处理字符串（也是类数组）
console.log('\n=== 处理字符串 ===');
const str = 'hello';
const charCodes = Array.prototype.myMap.call(str, char => char.charCodeAt(0));
console.log('字符编码:', charCodes); // [104, 101, 108, 108, 111]

// 6. 处理 NodeList（浏览器环境）
// const divs = document.querySelectorAll('div');
// const divTexts = Array.prototype.myMap.call(divs, div => div.textContent);