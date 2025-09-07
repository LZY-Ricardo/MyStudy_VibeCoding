let arr = [1, 2, 3, 4, 5]
let arr1 = [1, , 3, , , 6]

arr.forEach((item, index, arr) => {
    console.log(item, index, arr);
    arr[index] = item * 2
})
console.log(arr);
function callback(item) {
    console.log(item);
    
}
arr.forEach(callback)

const obj = {
    prefix: '数字:',
    processNumbers: function (arr) {
        arr.forEach(function (num) {
            console.log(this.prefix + num); // this指向obj
        }, this); // 传入thisArg
    }
};

obj.processNumbers([1, 2, 3]);
// 输出：
// 数字:1
// 数字:2
// 数字:3

console.log(1 in arr1); // false

// let obj = {
//     a: 1,
//     b: 2
// }
// console.log('a' in obj); // true
// 只有普通对象 才能用 i in obj 
// let map = new Map()
// map.set(1, 'a')
// map.set(2, 'b')
// console.log(map);
// console.log(1 in map); // false
// console.log('a' in map); // false



