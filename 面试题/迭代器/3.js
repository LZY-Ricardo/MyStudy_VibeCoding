// const arr = [1, 2, 3]
// console.log(arr[Symbol.iterator]); // [Function: values]
// const iterable = arr[Symbol.iterator]()
// console.log(iterable); // Object [Array Iterator] {}

// console.log(iterable.next()); // { value: 1, done: false }
// console.log(iterable.next()); // { value: 2, done: false }
// console.log(iterable.next()); // { value: 3, done: false }
// console.log(iterable.next()); // { value: undefined, done: true }


// function createIterator(arr) {
//     let index = 0
//     return {
//         next: function() {
//             if (index < arr.length) {
//                 return {value: arr[index++], done: false}
//             }
//             return {value: undefined, done: true}
//         }
//     }
// }
// const myIterator = createIterator([1, 2, 3])
// console.log(myIterator.next());
// console.log(myIterator.next());
// console.log(myIterator.next());
// console.log(myIterator.next());

let obj = {
    a: 1,
    b: 2,
    c: 3
}
obj[Symbol.iterator] = function() {
    let index = 0
    let keys = Object.keys(this)
    return {
        next: () => {
            if (index < keys.length) {
                return {value: this[keys[index++]], done: false}
            }
            return {value: undefined, done: true}
        }
    }
}
