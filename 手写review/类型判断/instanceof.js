function myInstanceof(target, type) {
    // 检查type是否为构造函数
    if (typeof type !== 'function') {
        throw new TypeError('Right-hand side of \'instanceof\' is not callable')
    }

    // 检查target是否为对象 不是对象都返回false
    if ((typeof target !== 'object' && typeof target !== 'function') || target === null) {
        // console.log(target);
        return false
    }

    // 获取target的原型链
    let proto = Object.getPrototypeOf(target)

    // 遍历原型链
    while (true) {
        if (proto === null) {
            return false
        }
        if (proto === type.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }

}

// 测试用例
console.log('=== 标准instanceof测试 ===')
console.log('[] instanceof Array:', [] instanceof Array)
console.log('myInstanceof([], Array):', myInstanceof([], Array))

console.log('{} instanceof Object:', {} instanceof Object)
console.log('myInstanceof({}, Object):', myInstanceof({}, Object))

console.log('function() {} instanceof Function:', (function () { }) instanceof Function)
console.log('myInstanceof(function() {}, Function):', myInstanceof(function () { }, Function))

console.log('\n=== 边界情况测试 ===')
console.log('null instanceof Object:', null instanceof Object)
console.log('myInstanceof(null, Object):', myInstanceof(null, Object))

console.log('undefined instanceof Object:', undefined instanceof Object)
console.log('myInstanceof(undefined, Object):', myInstanceof(undefined, Object))

console.log('NaN instanceof Number:', NaN instanceof Number)
console.log('myInstanceof(NaN, Number):', myInstanceof(NaN, Number))

// 自定义构造函数测试
function Person() { }
const person = new Person()
console.log('\n=== 自定义构造函数测试 ===')
console.log('person instanceof Person:', person instanceof Person)
console.log('myInstanceof(person, Person):', myInstanceof(person, Person))
console.log('person instanceof Object:', person instanceof Object)
console.log('myInstanceof(person, Object):', myInstanceof(person, Object))






console.log(null instanceof Number);
console.log(myInstanceof(null, Number));

