const arr = ['a', 'b', 'c', 'd', 'e']

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i])
// }

// arr.forEach((item, index, arr) => {
//     console.log(item, index, arr)
// })
// console.log(res); // undefined

const res = arr.map((item, index, array) => {
    // console.log(item, index, array)
    return item + 1 // 'a1'
})

console.log(arr);

console.log(res);
