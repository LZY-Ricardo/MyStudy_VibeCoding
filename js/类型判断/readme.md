# typeof
1. typeof 可以准确判断除了 null 以外的基本数据类型
2. typeof 判断引用类型, 除了 function 以外, 其他的都返回 object

- typeof 是通过将值转换成二进制来判断类型的, 对于二进制前三位是 0 的统一识别为对象, 而所有的引用类型转换成二进制前三位都是 0, null 的二进制全是 0, 所以 null 会被识别为 object


# instanceof
- 能准确判断引用类型, 判断的机制是通过对象的隐式原型链来查找是否存在某一项等于右边的prototype
- 不能判断基本数据类型, 因为基本数据类型没有原型, 只有对象才有原型 
- 原理: 遍历对象的隐式原型链, 直到找到 Object.prototype, 如果没有找到, 则返回 false

# Object.prototype.toString.call() 

Object.prototype.toString.call()
1. 如果 this value 未定义 ，则返回 “[object Undefined]”。
2. 如果 this value 为 null，则返回 “[object Null]”。
3. 设 O 为调用 ToObject 的结果，将 this 值作为参数传递。
4. 设 class 为 O 的 [[Class]] 内部属性的值。
5. 返回 String 值，该值是连接三个字符串 “[object ”、class 和 “]” 的结果。

# Array.isArray()