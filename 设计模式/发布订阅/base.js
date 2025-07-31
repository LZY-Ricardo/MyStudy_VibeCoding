const arr = ['a', 'b', 'c']

const newArr = []
arr.forEach((item, index, array) => {
    console.log(item, index, array);
    newArr.push(item + '1')
})

// const newArr = arr.map((item, index, array) => {
//     return item + '1'
// })
console.log(newArr);

console.log(arr.indexOf('a'));
console.log(arr.includes('d'));

const res = arr.find(item => {
    return item === 'a'
})
console.log(res);

const res2 = arr.findIndex(item => {
    return item === 'a'
})
console.log(res2);

const res3 = arr.findLastIndex(item => {
    return item === 'a'
})
console.log(res3);



