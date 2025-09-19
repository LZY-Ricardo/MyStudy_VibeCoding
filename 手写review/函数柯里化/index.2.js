function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...nextArgs) {
                return curried.apply(this,[...args, ...nextArgs])
            }
        }
    }
}

// 测试函数：计算四个数的和
function sum(a, b, c, d) {
    return a + b + c + d
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
