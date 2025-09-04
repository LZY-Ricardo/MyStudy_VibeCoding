// 演示数组遍历方法对原数组的影响

// 1. forEach - 可以修改原数组
console.log('=== forEach 修改原数组 ===');
let arr1 = [1, 2, 3, 4, 5];
console.log('原数组:', [...arr1]);

arr1.forEach((item, index, array) => {
    array[index] = item * 2; // 正确：通过第三个参数修改
});
console.log('修改后:', arr1);

// 错误示例：直接赋值item不会改变原数组
let arr2 = [1, 2, 3, 4, 5];
console.log('\n=== 错误示例 ===');
console.log('原数组:', [...arr2]);
arr2.forEach(item => {
    item = item * 2; // 错误：只是修改了局部变量
});
console.log('错误修改后:', arr2); // 仍然是 [1, 2, 3, 4, 5]

// 2. 对象数组的修改
console.log('\n=== 对象数组修改 ===');
let objArr = [
    { name: '张三', age: 18 },
    { name: '李四', age: 19 },
    { name: '王五', age: 20 }
];
console.log('原对象数组:', JSON.stringify(objArr));

objArr.forEach(item => {
    item.age += 1; // 直接修改对象属性，会改变原数组
});
console.log('修改后对象数组:', JSON.stringify(objArr));

// 3. 使用索引修改
console.log('\n=== 使用索引修改 ===');
let arr3 = [1, 2, 3, 4, 5];
console.log('原数组:', [...arr3]);

arr3.forEach((_, index, array) => {
    array[index] = array[index] * 3;
});
console.log('索引修改后:', arr3);

// 4. 其他遍历方法对比
console.log('\n=== 其他遍历方法对比 ===');
let arr4 = [1, 2, 3, 4, 5];
console.log('原数组:', [...arr4]);

// map 返回新数组
let newArr = arr4.map(item => item * 4);
console.log('map新数组:', newArr);
console.log('原数组不变:', arr4);

// filter 返回新数组
let filtered = arr4.filter(item => item > 3);
console.log('filter新数组:', filtered);
console.log('原数组不变:', arr4);