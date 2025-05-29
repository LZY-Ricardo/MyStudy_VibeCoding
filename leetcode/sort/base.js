// 数组  有序  线性  索引
// const arr = [1, 2, 3, 4, 5];

// arr.unshift('hello')
// arr.shift()
// arr.push('world')
// arr.pop()
// arr.splice(2,0,'a')
// arr.splice(4,1)

// console.log(arr);


const arr = [3, 5, 7, 2, 1, {b: -2}, {a: -1}]

arr.sort(function(a,b){
    return b - a
})

console.log(arr);


// function add(a,b){ // 形参
//     return a + b
// }

// add(1, 2) // 实参
// add(10, 20)