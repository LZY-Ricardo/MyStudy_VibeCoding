// Object.prototype[Symbol.iterator] = function() {
//     // let index = 0
//     // // let keys = Object.keys(this) // ['a', 'b']
//     // let values = Object.values(this) // [1, 2]
//     // return {
//     //     next: () => {
//     //         if (index < values.length) {
//     //             // return {value: this[keys[index++]], done: false}
//     //             return {value: values[index++], done: false}
//     //         }
//     //         return {value: undefined, done: true}
//     //     }
//     // }

//     return Object.values(this)[Symbol.iterator]() 
// }

Object.prototype[Symbol.iterator] = function*() {
    return yield* Object.values(this)
}

let [a, b] = {a: 1, b: 2}
console.log(a, b)

// let obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// for (let item of obj) {
//     console.log(item)
// }