// Array.filter 方法深度解析
console.log('=== Array.filter 方法深度解析 ===\n')

// 1. 标准实现（完全符合ECMAScript规范）
Array.prototype.standardFilter = function(callback, thisArg) {
    // 1. 参数校验
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    
    // 2. 处理this值
    const O = Object(this)
    const len = parseInt(O.length) || 0
    
    // 3. 创建结果数组
    const A = []
    
    // 4. 遍历并筛选
    for (let k = 0; k < len; k++) {
        if (k in O) {
            const kValue = O[k]
            const testResult = callback.call(thisArg, kValue, k, O)
            if (Boolean(testResult)) {
                A.push(kValue)
            }
        }
    }
    
    return A
}

// 2. 核心特性演示
console.log('=== 核心特性演示 ===')

// 2.1 基本用法
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const evens = numbers.filter(num => num % 2 === 0)
console.log('原始数组:', numbers)
console.log('偶数筛选:', evens)

// 2.2 对象筛选
const users = [
    { name: '张三', age: 25, active: true },
    { name: '李四', age: 30, active: false },
    { name: '王五', age: 35, active: true },
    { name: '赵六', age: 28, active: false }
]

const activeUsers = users.filter(user => user.active)
console.log('活跃用户:', activeUsers)

const adults = users.filter(user => user.age >= 30)
console.log('成年人:', adults)

// 2.3 索引参数使用
const indexedFilter = numbers.filter((num, index) => index % 2 === 0)
console.log('偶数索引元素:', indexedFilter)

// 2.4 稀疏数组处理
const sparseArray = [1, , 3, , 5, , 7]
const sparseResult = sparseArray.filter(num => num > 3)
console.log('稀疏数组筛选:', sparseResult)

// 3. 边界情况测试
console.log('\n=== 边界情况测试 ===')

// 3.1 空数组
const empty = [].filter(x => x > 0)
console.log('空数组筛选:', empty)

// 3.2 无匹配元素
const noMatch = [1, 2, 3].filter(x => x > 10)
console.log('无匹配结果:', noMatch)

// 3.3 所有元素匹配
const allMatch = [1, 2, 3].filter(x => x > 0)
console.log('全部匹配:', allMatch)

// 3.4 null 和 undefined 处理
const withNulls = [1, null, 3, undefined, 5]
const notNulls = withNulls.filter(x => x !== null && x !== undefined)
console.log('排除null/undefined:', notNulls)

// 4. thisArg 参数演示
console.log('\n=== thisArg 参数使用 ===')

const threshold = { min: 5, max: 15 }
const filteredWithThis = numbers.filter(function(num) {
    return num >= this.min && num <= this.max
}, threshold)
console.log('使用thisArg筛选:', filteredWithThis)

// 5. 类数组对象支持
console.log('\n=== 类数组对象支持 ===')

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
const filteredLike = Array.prototype.filter.call(arrayLike, x => x !== 'b')
console.log('类数组筛选:', filteredLike)

// 6. 性能对比测试
console.log('\n=== 性能对比测试 ===')

const largeArray = Array(10000).fill(0).map((_, i) => i)

console.time('原生 filter')
const nativeResult = largeArray.filter(x => x % 2 === 0)
console.timeEnd('原生 filter')

console.time('手写 filter')
const customResult = largeArray.standardFilter(x => x % 2 === 0)
console.timeEnd('手写 filter')

console.log('结果一致性:', nativeResult.length === customResult.length)

// 7. 实际应用场景
console.log('\n=== 实际应用场景 ===')

// 7.1 数据清洗
const messyData = [
    { id: 1, name: '张三', email: 'zhang@example.com' },
    { id: 2, name: '李四', email: null },
    { id: 3, name: '', email: 'wang@example.com' },
    { id: 4, name: '赵六', email: 'zhao@example.com' }
]

const validUsers = messyData.filter(user => 
    user.name && user.email && user.email.includes('@')
)
console.log('有效用户:', validUsers)

// 7.2 去重实现
const duplicates = [1, 2, 2, 3, 3, 3, 4, 5]
const unique = duplicates.filter((item, index, array) => 
    array.indexOf(item) === index
)
console.log('去重结果:', unique)

// 7.3 搜索过滤
const products = [
    { name: 'iPhone 15', price: 5999, category: '手机' },
    { name: 'MacBook Pro', price: 12999, category: '电脑' },
    { name: 'iPad Air', price: 3999, category: '平板' },
    { name: 'AirPods', price: 1299, category: '耳机' }
]

const expensiveProducts = products.filter(product => product.price > 5000)
const mobileProducts = products.filter(product => product.category === '手机')
console.log('高价产品:', expensiveProducts)
console.log('手机产品:', mobileProducts)

// 8. 链式操作演示
console.log('\n=== 链式操作演示 ===')

const complexFilter = numbers
    .filter(x => x > 3)
    .filter(x => x % 2 === 0)
    .map(x => x * 2)
console.log('复杂链式操作:', complexFilter)

// 9. 错误处理测试
console.log('\n=== 错误处理 ===')

try {
    [1, 2, 3].filter('not a function')
} catch (e) {
    console.log('错误捕获:', e.message)
}

// 10. 高级技巧
console.log('\n=== 高级技巧 ===')

// 10.1 自定义筛选条件
const advancedFilter = (array, conditions) => {
    return array.filter(item => 
        Object.keys(conditions).every(key => {
            const condition = conditions[key]
            if (typeof condition === 'function') {
                return condition(item[key])
            }
            return item[key] === condition
        })
    )
}

const advancedUsers = [
    { name: '张三', age: 25, city: '北京', active: true },
    { name: '李四', age: 35, city: '上海', active: false },
    { name: '王五', age: 28, city: '北京', active: true }
]

const filteredAdvanced = advancedFilter(advancedUsers, {
    city: '北京',
    active: true,
    age: age => age > 25
})
console.log('高级筛选:', filteredAdvanced)

// 11. 性能优化技巧
console.log('\n=== 性能优化技巧 ===')

// 11.1 提前返回优化
const optimizedFilter = (array, predicate) => {
    if (!array || !array.length) return []
    
    const result = []
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
            result.push(array[i])
        }
    }
    return result
}

const optResult = optimizedFilter([1, 2, 3, 4, 5], x => x > 3)
console.log('优化筛选:', optResult)

// 12. 与find、some、every对比
console.log('\n=== 方法对比 ===')

const testData = [1, 2, 3, 4, 5]

console.log('原始数据:', testData)
console.log('filter(>3):', testData.filter(x => x > 3)) // 返回所有匹配
console.log('find(>3):', testData.find(x => x > 3))   // 返回第一个匹配
console.log('some(>3):', testData.some(x => x > 3))   // 返回布尔值
console.log('every(>3):', testData.every(x => x > 3)) // 返回布尔值