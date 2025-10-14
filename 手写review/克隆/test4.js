let arr = [1, 2, 3, 4, 5]
arr.__proto__ = {
    a: '我是数组'
}
for (let i in arr) {
    console.log(i);
}

let obj = {
    name: '对象',
    age: '18',
}
obj.__proto__ = {
    a: '我是对象'
}

for (let key in obj) {
    console.log(key, obj[key]);
    if (Object.hasOwn(obj, key)) {
        console.log('显示拥有的属性');
    } else {
        console.log('隐式原型上的属性');
    }
}