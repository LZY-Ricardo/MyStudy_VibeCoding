var obj = {
    a: 1,
    b: 2,
};

// for (var key in obj) {
//   console.log(key);
// }

// var keys = Object.keys(obj);
// console.log(keys);

// console.log(obj);

// 得到属性描述符
var desc = Object.getOwnPropertyDescriptor(obj, 'a')
// console.log(desc)
// { value: 1, writable: true, enumerable: true, configurable: true }


// 设置属性描述符
Object.defineProperty(obj, 'a', {
    value: 10,
    writable: false, // 不可重写
    enumerable: false, // 不可枚举
    configurable: false, // 不可配置 不可再次修改描述符
});
// Object.defineProperty(obj, 'a', {
//     writable: true, 
// });
obj.a = 'abc';
console.log(obj.a);

// for (var key in obj) {
//   console.log(key);
// }
