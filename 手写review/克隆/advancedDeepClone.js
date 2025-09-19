/**
 * 深拷贝函数 - 支持循环引用处理
 * @param {*} obj 要拷贝的对象
 * @param {WeakMap} visited 用于记录已访问对象的WeakMap，防止循环引用
 * @returns {*} 深拷贝后的新对象
 */
function deepClone(obj, visited = new WeakMap()) {
    // 处理基础类型和null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 检查循环引用 - 如果对象已经被访问过，直接返回缓存的拷贝
    if (visited.has(obj)) {
        return visited.get(obj);
    }
    
    let newObj;
    
    // 处理数组
    if (Array.isArray(obj)) {
        newObj = [];
        visited.set(obj, newObj); // 先设置缓存，防止循环引用
        
        for (let i = 0; i < obj.length; i++) {
            newObj[i] = deepClone(obj[i], visited);
        }
        return newObj;
    }
    
    // 处理特殊对象类型
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Set) {
        newObj = new Set();
        visited.set(obj, newObj);
        obj.forEach(value => {
            newObj.add(deepClone(value, visited));
        });
        return newObj;
    }
    
    if (obj instanceof Map) {
        newObj = new Map();
        visited.set(obj, newObj);
        obj.forEach((value, key) => {
            newObj.set(deepClone(key, visited), deepClone(value, visited));
        });
        return newObj;
    }
    
    // 处理函数
    if (typeof obj === 'function') {
        // 函数拷贝方式1: 创建包装函数（推荐）
        return function(...args) {
            return obj.apply(this, args);
        };
        
        // 函数拷贝方式2: 使用Function构造函数（有局限性）
        // return new Function('return ' + obj.toString())();
    }
    
    // 处理Symbol
    if (typeof obj === 'symbol') {
        return Symbol(obj.description);
    }
    
    // 处理普通对象
    newObj = {};
    visited.set(obj, newObj); // 先设置缓存，防止循环引用
    
    // 拷贝所有可枚举属性（包括Symbol属性）
    const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
    
    for (let key of keys) {
        // if (obj.hasOwnProperty(key)) {
        //     newObj[key] = deepClone(obj[key], visited);
        // }
        if (Object.hasOwn(obj, key)) {
            newObj[key] = deepClone(obj[key], visited);
        }
    }
    
    return newObj;
}

// 创建一个包含各种数据类型的复杂测试对象
let obj = {
    // 基础类型
    str: "Hello World",
    num: 42,
    bool: true,
    nullVal: null,
    undefinedVal: undefined,
    
    // 引用类型 - 数组
    arr: [1, 2, 3, "array", { nested: "object" }],
    
    // 引用类型 - 嵌套对象
    nestedObj: {
        level1: {
            level2: {
                level3: "深层嵌套",
                arr: [4, 5, 6]
            }
        }
    },
    
    // 特殊对象类型
    date: new Date(),
    regex: /test/gi,
    
    // 函数
    func: function() {
        return "这是一个函数";
    },
    
    // Symbol (ES6)
    sym: Symbol("test"),
    
    // 空数组和空对象
    emptyArr: [],
    emptyObj: {},
    
    // 混合数组
    mixedArr: [
        "string",
        123,
        { key: "value" },
        [1, 2, 3],
        null,
        undefined
    ]
};

// 添加循环引用测试
obj.self = obj; // 指向自身的循环引用
obj.nestedObj.parent = obj; // 嵌套对象中的循环引用

console.log("原始对象:", obj);
console.log("深拷贝结果:", deepClone(obj));

// 验证循环引用是否正确处理
const clonedObj = deepClone(obj);
console.log("循环引用测试:");
console.log("原对象的self === 原对象:", obj.self === obj); // true
console.log("克隆对象的self === 克隆对象:", clonedObj.self === clonedObj); // true
console.log("克隆对象的self === 原对象:", clonedObj.self === obj); // false
console.log("嵌套循环引用测试:", clonedObj.nestedObj.parent === clonedObj); // true