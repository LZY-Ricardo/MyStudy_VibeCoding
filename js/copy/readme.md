# 面试题: 请你手写一个深浅拷贝函数


# v8 是如何存储数据的
1. 栈内存：存储基本数据类型和引用数据类型的地址
2. 堆内存：存储引用数据类型的具体值

# js中的数据类型
1. 基本类型
2. 引用类型

# 拷贝
- 复刻一个对象, 和原对象长的一模一样

- 浅拷贝: 只拷贝对象的最外层, 原对象的属性值修改会影响新对象
1. Object.create(obj)
2. [].concat(arr) || arr.concat()
3. 数组解构 [...arr]
4. arr.slice(0, arr.length)
5. Object.assign({}, obj)
6. arr.toReversed().reverse()

- 深拷贝: 层层拷贝, 新对象不受原对象的影响
1. JSON.parse(JSON.stringify(obj))
  - 无法识别 bigint 类型, 无法处理 undefined, symbol, function, 会直接丢失
  - 无法处理循环引用
2. structuredClone(obj)
  - 可以处理循环引用
  - 可以处理 undefined, 无法处理 symbol, function, 会直接丢失
  - 可以处理 bigint 类型