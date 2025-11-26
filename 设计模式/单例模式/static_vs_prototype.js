// 示例：演示 static 方法与原型方法的区别

class MyClass {
  // 静态方法 - 附加到类本身
  static staticMethod() {
    return '这是静态方法';
  }

  // 原型方法 - 附加到 MyClass.prototype 上
  prototypeMethod() {
    return '这是原型方法';
  }
}

// 静态方法只能通过类访问
console.log(MyClass.staticMethod()); // 正常工作

// 原型方法只能通过实例访问
const instance = new MyClass();
console.log(instance.prototypeMethod()); // 正常工作

// 下面这两行会报错：
// console.log(MyClass.prototypeMethod()); // 错误！
// console.log(instance.staticMethod()); // 错误！

// 验证方法的位置：
console.log('静态方法存在于类上:', typeof MyClass.staticMethod); // function
console.log('原型方法存在于原型上:', typeof MyClass.prototype.prototypeMethod); // function
console.log('静态方法存在于原型上:', typeof MyClass.prototype.staticMethod); // undefined