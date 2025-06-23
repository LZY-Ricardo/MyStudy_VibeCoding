// let a = 1
// let b = 2
// let c = 3

// let [a, b, c] = [1, 2, 3]

// const arr = [1, [2, 3, [4],5]]
// let [a, [b, c, [d]]] = arr
// console.log(arr);

// const arr = [1, 2, 3, 4, 5]
// let [a, ...b] = arr
// console.log(a, b);

// const sex = 'boy'
// const obj = {
//     name: 'Ricardo',
//     age: 18,
//     sex,
//     like: {
//         food: 'rice'
//     }
// }

// let name = obj.name
// let {name, age, like: {food}} = obj
// console.log(name, age, food);

// const [a, b, c, d, e] = 'hello'
// console.log(a, b, c, d, e);

// const str = 'hello' // str.length
// let {length} = 'hello'
// console.log(length);

function foo({x: a, y: b}) {
    return a + b
}

console.log(foo({x: 1, y: 2}))