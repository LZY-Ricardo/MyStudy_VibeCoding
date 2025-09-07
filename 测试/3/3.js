const a = {
    i: 1,
    toString: function () {
        return a.i++; 
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log('hello world!');
}

// 具体执行过程分析：
// 对象 a 的结构：
// 对象 a 有一个属性 i（初始值为 1），和一个自定义的 toString 方法，该方法返回 a.i++（先返回当前 i 的值，再将 i 自增 1）。
// == 运算符的隐式转换：
// 当使用 == 比较一个对象（a）和一个原始值（1、2、3）时，JavaScript 会自动将对象转换为原始值。转换规则是：优先调用对象的 valueOf() 方法，如果返回的不是原始值，再调用 toString() 方法。
// 这里 a 没有自定义 valueOf，所以会调用自定义的 toString 方法。
// 三次比较的执行细节：
// 第一次比较 a == 1：调用 a.toString()，返回当前 i 的值（1），然后 i 自增为 2。此时条件成立。
// 第二次比较 a == 2：再次调用 a.toString()，返回当前 i 的值（2），然后 i 自增为 3。此时条件成立。
// 第三次比较 a == 3：第三次调用 a.toString()，返回当前 i 的值（3），然后 i 自增为 4。此时条件成立。
// 最终结果：
// 三个条件都满足（true && true && true），因此执行 console.log('hello world!')。