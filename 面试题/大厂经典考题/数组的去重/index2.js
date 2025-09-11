let arr = [
    { name: '张三', age: 18, like: { n: 'running' } },
    { name: '李四', age: 19 },
    { name: '张三', age: 18, like: { n: 'running' } },
    { name: '王五', age: 18 },
]

// 方法1: 使用JSON序列化去重（适用于简单对象）
function uniqueByJSON(arr) {
    const seen = new Set();
    return arr.filter(item => {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

// 方法2: 根据特定属性去重（更灵活）
function uniqueByProperty(arr, key) {
    const seen = new Set();
    return arr.filter(item => {
        const value = key ? item[key] : JSON.stringify(item);
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

// 方法3: 使用Map去重（保持原顺序）
function uniqueByMap(arr) {
    const map = new Map();
    arr.forEach(item => {
        const key = JSON.stringify(item);
        if (!map.has(key)) {
            map.set(key, item);
        }
    });
    return Array.from(map.values());
}

console.log('原始数组:', arr);
console.log('方法1结果:', uniqueByJSON(arr));
console.log('方法2结果（按name去重）:', uniqueByProperty(arr, 'name'));
console.log('方法3结果:', uniqueByMap(arr));


function unique(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        // arr[i]
        let has = false
        for (let j = 0; j < res.length; j++) {
            if (equal(arr[i], res[j])) {
                has = true
                break
            }
        }
        if (!has) {
            res.push(arr[i])
        }
    }
    return res
}

function unique2(arr) { // 使用 reduce 方法实现去重
  return arr.reduce((prev, curr) => {
    // 判断当前元素是否已经在结果数组中
    const isExist = prev.some(item => equal(item, curr));
    if (!isExist) {
      prev.push(curr);
    }
    return prev;
  }, []);
}

function equal(v1, v2) {
    if ((typeof v1 === 'object' && v1 !== null) && (typeof v2 === 'object' && v2 !== null)) {
        if (Object.keys(v1).length !== Object.keys(v2).length) {
            return false
        }
        for (let key in v1) {
            if (key in v2) { // 确保v2也有这个属性
                // equal(v1[key], v2[key])
                if (!equal(v1[key], v2[key])) {
                    return false
                }
            } else {
                return false
            }
        }
        return true
    } else {
        return v1 === v2
    }
}

function equal(v1, v2) {
    // 处理基本类型和null
    if (v1 === v2) return true;
    if (v1 === null || v2 === null) return false;
    if (typeof v1 !== typeof v2) return false;

    // 处理NaN
    if (Number.isNaN(v1) && Number.isNaN(v2)) return true;

    // 处理对象和数组
    if (typeof v1 === 'object' && typeof v2 === 'object') {
        // 处理数组
        if (Array.isArray(v1) && Array.isArray(v2)) {
            if (v1.length !== v2.length) return false;
            for (let i = 0; i < v1.length; i++) {
                if (!equal(v1[i], v2[i])) return false;
            }
            return true;
        }

        // 处理日期对象
        if (v1 instanceof Date && v2 instanceof Date) {
            return v1.getTime() === v2.getTime();
        }

        // 处理正则表达式
        if (v1 instanceof RegExp && v2 instanceof RegExp) {
            return v1.toString() === v2.toString();
        }

        // 处理普通对象
        const keys1 = Object.keys(v1);
        const keys2 = Object.keys(v2);

        if (keys1.length !== keys2.length) return false;

        for (let key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!equal(v1[key], v2[key])) return false;
        }

        return true;
    }

    return false;
}
console.log('equal函数测试结果:');
console.log('基本测试:', unique2(arr));

// 测试更复杂的用例
let complexArr = [
    { name: '张三', age: 18, like: { n: 'running' }, hobbies: ['reading', 'coding'] },
    { name: '李四', age: 19, date: new Date('2023-01-01') },
    { name: '张三', age: 18, like: { n: 'running' }, hobbies: ['reading', 'coding'] },
    { name: '王五', age: 18, pattern: /abc/gi },
    { name: '张三', age: 18, like: { n: 'running' }, hobbies: ['reading', 'coding'] },
    { name: '李四', age: 19, date: new Date('2023-01-01') },
    { name: '赵六', age: 20, data: null }
]

console.log('复杂数组测试:', unique2(complexArr));

// 测试equal函数的各种边界情况
console.log('测试equal函数:');
console.log('NaN比较:', equal(NaN, NaN)); // true
console.log('数组比较:', equal([1, 2, 3], [1, 2, 3])); // true
console.log('日期比较:', equal(new Date('2023-01-01'), new Date('2023-01-01'))); // true
console.log('正则比较:', equal(/abc/gi, /abc/gi)); // true
