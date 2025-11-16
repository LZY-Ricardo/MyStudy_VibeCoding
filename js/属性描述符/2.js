var obj = {
    a: 1
};

var internalValue = undefined
Object.defineProperty(obj, 'a', {
    get: function () {
        // console.log('hello world');
        // return 123;
        return internalValue
    }, // 读取器 getter
    set: function (val) {
        // console.log('haha');
        internalValue = val
    }, // 设置器 setter
});

obj.a = 3 + 2; // set(3+2)
console.log(obj.a); // console.log(get())
obj.a = obj.a + 2; // set(get() + 2)
console.log(obj.a);


Object.defineProperty(obj, 'a', {
    get: function () {
        return 123
    }, // 读取器 getter
    set: function (val) {
        throw new Error('兄弟，这个属性是不能赋值的，你再考虑考虑')
    }, // 设置器 setter
});