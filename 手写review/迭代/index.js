// 方法一  
// 给对象原型上挂载一个手写的迭代器协议
Object.prototype[Symbol.iterator] = function () {
    const valuesArr = Object.values(this)
    const len = valuesArr.length
    let index = 0
    return {
        next: function () {
            if (index < len) {
                return {value: valuesArr[index++], done: false}
            }
            return {value: undefined, done: true}
        }
    }
}


// 方法二
// 给对象原型上挂载一个迭代器协议实际为对象的value值数组上的迭代器协议的实例对象
Object.prototype[Symbol.iterator] = function () {
    const valuesArr = Object.values(this)
    return valuesArr[Symbol.iterator]()
}


// 方法三：使用生成器函数实现迭代器协议
// 给对象原型上挂载一个迭代器协议，使用生成器函数简化实现
// 生成器函数会自动返回一个迭代器对象，无需手动实现 next() 方法
// yield* 语法用于委托给另一个可迭代对象（这里是 Object.values(this) 返回的数组）
// 相比方法一和方法二，这种写法更简洁，代码量更少
Object.prototype[Symbol.iterator] = function* () {
    // yield* 会逐个产出 Object.values(this) 数组中的每个值
    // 等价于：for (const value of Object.values(this)) { yield value }
    return yield* Object.values(this)
}



let [a, b] = { a: 1, b: 2 } // 让对象能被数组结构
console.log(a, b);
