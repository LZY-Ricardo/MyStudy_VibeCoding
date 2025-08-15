# 1. js数组上的常用方法

## 增加元素
- `push()` - 在数组末尾添加一个或多个元素，返回新数组长度
- `unshift()` - 在数组开头添加一个或多个元素，返回新数组长度
- `splice(index, 0, item1, item2, ...)` - 在指定位置插入元素, 修改原数组
- `concat()` - 连接两个或多个数组，返回新数组
- `Array.from()` - 从类数组或可迭代对象创建新数组
- `Array.of()` - 创建具有可变数量参数的新数组

## 删除元素
- `pop()` - 删除并返回数组最后一个元素
- `shift()` - 删除并返回数组第一个元素
- `splice(index, deleteCount)` - 删除指定位置的元素
- `slice(start, end)` - 返回数组的浅拷贝部分（不修改原数组）
- `filter()` - 创建新数组，包含通过测试的所有元素

## 修改元素
- `splice(index, deleteCount, item1, item2, ...)` - 替换指定位置的元素
- `fill(value, start, end)` - 用静态值填充数组的部分或全部元素
- `reverse()` - 颠倒数组中元素的顺序
- `sort()` - 对数组元素进行排序
- `map()` - 创建新数组，包含调用函数的结果
- `forEach()` - 对每个元素执行提供的函数
- `flat()` - 扁平化数组，将嵌套数组转换为一维数组

## 查找元素
- `indexOf(searchElement)` - 返回元素在数组中的第一个索引
- `lastIndexOf(searchElement)` - 返回元素在数组中的最后一个索引
- `includes(searchElement)` - 判断数组是否包含特定元素
- `find(callback)` - 返回满足测试函数的第一个元素
- `findIndex(callback)` - 返回满足测试函数的第一个元素的索引
- `some(callback)` - 测试数组中是否至少有一个元素通过测试
- `every(callback)` - 测试数组中所有元素是否都通过测试
- `reduce(callback, initialValue)` - 对数组中的每个元素执行reducer函数
- `reduceRight(callback, initialValue)` - 从右到左对数组执行reducer函数

## 迭代数组
- `forEach(callback)` - 对数组的每个元素执行一次提供的函数
- `map(callback)` - 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
- `filter(callback)` - 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
- `sort(callback)` - 对数组的元素进行排序
- `some(callback)` - 测试数组中是否至少有一个元素通过测试
- `every(callback)` - 测试数组中所有元素是否都通过测试
- `reverse()` - 颠倒数组中元素的顺序
- `join(separator)` - 将数组的所有元素连接到一个字符串中
- `reduce(callback, initialValue)` - 对数组中的每个元素执行reducer函数
- `reduceRight(callback, initialValue)` - 从右到左对数组执行reducer函数


# 2. 聊一聊数组的扁平化
 - 是什么
  flat 是 Array 原型上的函数, 用于将高维数组处理成低维数组

 - 原理:
 1. 递归
 2. reduce + 递归 (1的优化版)
 3. while + 解构
 4. toString() 可以处理纯数字或纯字符串的高维数组

# 3. 字符串上常见的方法
 - 增:
  - `concat()` - 连接两个或多个字符串，返回新字符串
 - 删:
  - `slice(start, end)` - 提取字符串的一部分，返回新字符串
  - `substring(start, end)` - 提取字符串的一部分，返回新字符串
  - `substr(start, length)` - 提取字符串的一部分，返回新字符串
  - `trim()` - 移除字符串首尾空格，返回新字符串
  - `trimStart()` - 移除字符串开头空格，返回新字符串
  - `trimEnd()` - 移除字符串末尾空格，返回新字符串
 - 改:
  - `toLowerCase()` - 将字符串转换为小写
  - `toUpperCase()` - 将字符串转换为大写
  - `replace(searchValue, newValue)` - 替换字符串中的指定值，返回新字符串
  - `replaceAll(searchValue, newValue)` - 替换字符串中所有指定值，返回新字符串
  - `repeat(count)` - 重复字符串指定次数，返回新字符串
  - `trim()` - 移除字符串首尾空格，返回新字符串
  - `trimStart()` - 移除字符串开头空格，返回新字符串
  - `trimEnd()` - 移除字符串末尾空格，返回新字符串
  - `padStart(targetLength, padString)` - 从字符串开头填充指定字符串
  - `padEnd(targetLength, padString)` - 从字符串末尾填充指定字符串
 - 查:
  - `indexOf(searchValue)` - 返回指定值在字符串中首次出现的索引
  - `lastIndexOf(searchValue)` - 返回指定值在字符串中最后一次出现的索引
  - `includes(searchValue)` - 判断字符串是否包含特定值
  - `startsWith(searchValue)` - 判断字符串是否以特定值开头
  - `endsWith(searchValue)` - 判断字符串是否以特定值结尾
  - `charAt(index)` - 返回指定索引处的字符
  - `split(separator)` - 将字符串拆分为子字符串数组
  - `match(regexp)` - 检索字符串与正则表达式的匹配项
  - `search(regexp)` - 检索字符串与正则表达式的匹配项的索引
  - `charCodeAt(index)` - 返回指定索引处的字符的 Unicode 编码
  - `codePointAt(index)` - 返回指定索引处的字符的 Unicode 码点
  - `fromCharCode()` - 从 Unicode 码点创建字符串



# 4. 谈谈 js 中的类型转换机制
 - 是什么
 js 引擎在执行各种运算符对于数据的类型是有要求的, 如果数据类型和预期的不符合, 就会发生类型转换
 类型转换是指将一个数据类型转换为另一个数据类型的过程。在 JavaScript 中，类型转换主要发生在以下几种情况：
 - 特点
   1. 显式类型转换：使用 Number()、String()、Boolean() 等全局函数，或者调用对象的 toString()、valueOf() 等方法进行类型转换。
    - 显示类型转换: 人为的借助构造函数来将一种类型转换成希望的原始类型, 这其中如果是原始值转原始值, 官方给出了直接的转换的结果.
    但如果是引用类型转原始类型:
     - ToNumber([1, 2]) || ToString([1, 2]) 判断 参数 是否是原始类型, 是则返回 undefined => NaN  Null => 0 Boolean => 0 | 1 ...
     - ToPrimitive([1, 2], Number)
     - 判断 参数 是否是原始类型, 是则直接返回参数 (如果第二个参数如果是String, 则先调用 xxx.toString() 再调用 xxx.valueOf())
     - 否则, 调用 xxx.valueOf(), 得到原始值则返回
     - 否则, 调用 xxx.toString(), 得到原始值则返回 
     - 否则, 抛出类型错误异常

   2. 隐式类型转换：在表达式中自动进行的类型转换，通常发生在 四则运算 (+ - * / %), 比较运算 (== != > <), 判断语句(if while) 中。



# 5. 介绍一下 js 中的拷贝问题
 - 是什么
  因为 js 中的原始类型存在栈中, 引用类型存在堆中, 再把引用地址存在栈中, 所以拷贝通常只发生在引用类型上。 效果是创建一份新的数据, 让新数据拥有原数据一样的属性值。

 - 方法
    1. 浅拷贝: 拷贝对象的属性值, 如果属性值是引用类型, 则拷贝的是引用地址,则共用同一个地址, 而不是引用类型的内容
    2. 深拷贝: 拷贝对象的属性值, 如果属性值是引用类型, 则递归拷贝, 直到拷贝的属性值是原始类型

    - 浅拷贝:
     slice(), 
     [].concat(arr), 
     [...arr],
     Object.create(obj),
     Object.assign({}, obj),
     arr.toReversed().reverse()

    - 深拷贝: 
     JSON.parse(JSON.stringify(obj)) --- 不能处理 undefined 、Symbol、Bigint、function、循环引用

     structuredClone(obj) --- 不能处理 Symbol、bigint、function

     MessageChannel() --- 不能处理 function, symbol

     - 原理
       深递归: 递归拷贝, 判断是否是引用类型, 如果是则递归拷贝, 直到拷贝的属性值是原始类型就直接赋值



# 6. 说说你对闭包的理解
 - 是什么
  闭包是一个集合 根据作用域的查找规则, 内部函数一定有权力可以访问外部函数的变量, 另外 , 一个函数执行完后它的执行上下文会被销毁。 那么在一个函数A 里面声明了一个函数 B, 而函数 B 被拿到了 函数A 的外部调用执行, 为了保证以上两条规则正常执行, A 函数在执行完毕后 销毁不会彻底 而是会留下一个集合在调用栈中, 保存 函数A 中会被 函数B 需要访问的变量, 这个集合就是闭包

 - 特点: 
 1. 用于封装模块, 避免全局变量污染
 2. 延长了变量的生命周期 
 
 3. 造成内存泄漏

 - 场景:
 1. 柯理化
 2. 单例模式
 3. 防抖节流
 


# 7. 说说你对 js 中作用域的理解
 - 是什么
  在一个区域中, 生效了的变量和函数, 我们就可以在这个区域中使用这个变量和函数, 这个区域就是作用域
 - 特点
  1. 全局作用域
  2. 函数作用域
  3. 块级作用域

  4. 词法作用域 -- 描述的是一个函数所处的作用域

 - 作用域链
  js 引擎在查找变量时, 会现在作用域中查找, 找不到就会去外层作用域查找, 层层往上, 直到全局作用域, 这种查找的链状关系就叫作用域链



# 8. 说说你对 js 中原型的理解
 - 是什么
  在 js 中原型分为两种, 一种是函数的原型(显示原型), 一种是对象的原型(隐式原型), 显示原型指的是函数身上自带的属性 prototype, 隐式原型指的是对象上的 __proto__ (Object.getPrototypeOf(obj)) 属性


 - 特点
  对象的 __proto__ 属性指向它的构造函数的 prototype 属性, 因为 js 引擎在查找属性时, 会先在对象的属性中查找, 找不到就会去对象的 __proto__ 中查找, 直到找到全局对象的 __proto__ 为止, 全局对象的 __proto__ 指向 null。 所以原型存在的意义, 就是让实例对象可以访问到公共的方法

 - 原型链 
  js 引擎在查找属性时, 会先在对象上查找, 找不到就会去对象的 __proto__ 中查找, 还找不到就会顺着 __proto__ 层层往上查找, 直到找到全局对象的 __proto__ 为止, 全局对象的 __proto__ 指向 null。 这个查找的链状关系就是原型链

 - 特殊
   没有原型的对象 
     - Object.create(obj) 创建一个新对象, 让这个新对象的隐式原型等于传入的obj
     - Object.create(null) 得到一个没有原型的对象

# 9. 说说 js 中的继承
 - 是什么
    让子类可以访问到父类的属性和方法
 
 - 实现方式
    1. 原型链继承 -- 多个实例共享一个原型对象, 相互影响
    2. 构造函数继承 -- 无法继承到父类原型上的属性
    3. 组合继承 -- 父类构造函数会执行两次, 浪费性能

    4. 原型式继承 -- 多个实例共享一个原型对象, 相互影响
    5. 寄生式继承 -- 同上
    6. 寄生组合式继承 -- 最优解

    7. 类继承 -- 利用 extends 关键字实现继承



# 10. 说说你对 js 中 this 的理解
 - 是什么
  this 是 js 中一个比较特殊的关键字,它可以简化上下文的参数传递, 提高代码的复用性, 它指向的是当前函数的调用者, 不同的调用方式, this 指向的是不同的对象

 - 规则
  1. 函数独立调用 --- 默认绑定规则 => this 指向 window
  2. 函数被对象调用 --- 隐式绑定规则 --- this 指向调用对象
  3. call, apply, bind --- 显示绑定规则 --- this 指向绑定的对象
  4. new 绑定规则 --- 构造函数绑定规则 --- this 指向新创建的对象
