// 测试函数：计算四个数的和
function sum(a, b, c, d) {
    return a + b + c + d
}

/**
 * 柯里化函数实现
 * @param {Function} fn - 需要柯里化的函数
 * @returns {Function} - 柯里化后的函数
 */
function curry(fn) {
    return function curried(...args) {
        // 如果传入的参数数量大于等于原函数的参数数量，直接执行原函数
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            // 否则返回一个新的函数，继续收集参数
            return function (...nextArgs) {
                return curried.apply(this, args.concat(nextArgs))
            }
        }
    }
}

// 创建柯里化版本的 sum 函数
const currySum = curry(sum)

// 测试各种调用方式
console.log('=== 柯里化函数测试 ===')
console.log('currySum(1)(2)(3)(4):', currySum(1)(2)(3)(4)) // 10
console.log('currySum(1, 2)(3)(4):', currySum(1, 2)(3)(4)) // 10
console.log('currySum(1)(2, 3, 4):', currySum(1)(2, 3, 4)) // 10
console.log('currySum(1, 2, 3, 4):', currySum(1, 2, 3, 4)) // 10

// 测试部分应用
const add1 = currySum(1)
const add1and2 = add1(2)
console.log('部分应用测试 add1and2(3)(4):', add1and2(3)(4)) // 10