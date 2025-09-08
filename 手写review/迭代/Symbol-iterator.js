// 手写数组迭代器
function symbolIterator(arr) {
    let index = 0
    return {
        next: () => {
            if (index < arr.length) {
                return {value: arr[index++], done: false}
            }
            return {value: undefined, done: true}
        } 
    }
}
let arr = [1, 2, 3]
// const iterator = arr[Symbol.iterator]()
// const iterator = symbolIterator(arr)
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());



// 手写对象迭代器
let obj = {
    a: 4,
    b: 5,
    c: 6
}
obj[Symbol.iterator] = function () {
    let valuesArr = Object.values(this)
    let len = valuesArr.length
    let index = 0
    return {
        next: () => {
            if (index < len) {
                return {value: valuesArr[index++], done: false}
            }
            return {value: undefined, done: true}
        }
    }
}
const iterator = obj[Symbol.iterator]()
console.log((iterator.next()));
console.log((iterator.next()));
console.log((iterator.next()));
console.log((iterator.next()));

