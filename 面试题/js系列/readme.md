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


