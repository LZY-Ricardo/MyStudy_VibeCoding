function myInstanceof(L, R) {
    // // 1. 获取右侧构造函数的原型对象
    // // 如果 R 不是函数，或者 R.prototype 不是对象，则直接抛出错误，因为 instanceof 只能用于判断对象和构造函数
    // if (typeof R !== 'function' || R.prototype === null || typeof R.prototype !== 'object') {
    //     // 根据 instanceof 的行为，如果右侧不是函数，会直接报错 TypeError
    //     // 但为了兼容性，这里可以根据实际需求选择抛出错误或返回 false
    //     // 标准行为是 TypeError: Right-hand side of 'instanceof' is not an object
    //     throw new TypeError('Right-hand side of instanceof is not callable');
    // }
    // // 2. 获取左侧对象的原型对象
    // // L.__proto__ 是 ES6 之前访问 [[Prototype]] 的方式，现在推荐使用 Object.getPrototypeOf(L)
    // let proto = Object.getPrototypeOf(L); // 或者 L.__proto__
    // // 3. 循环遍历左侧对象的原型链
    // while (true) {
    //     // 3.1 如果原型链已经查找到尽头（null），说明没有找到匹配的原型，返回 false
    //     if (proto === null) {
    //         return false;
    //     }

    //     // 3.2 如果当前原型对象严格等于右侧构造函数的原型对象，说明找到了，返回 true
    //     if (proto === R.prototype) {
    //         return true;
    //     }

    //     // 3.3 继续向上查找原型链
    //     proto = Object.getPrototypeOf(proto); // 或者 proto.__proto__
    // }
    if (typeof L !== 'object' || L === null) return false

    while (L) {
        if ( L.__proto__ === R.prototype) return true
        L = L.__proto__
    }
    return false
}

console.log(myInstanceof([], Array));
console.log(myInstanceof({}, Object));
console.log(myInstanceof(function () { }, Function)); // false 
console.log(function () {} instanceof Function); // true
console.log(myInstanceof(new Date(), Date));


