// function A() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('A执行了');
//             resolve('A')
//         }, 1000)
//     })
// }

// function B() {
//     console.log('B');
    
// }

// function* foo(x) {
//     let a = yield A()
//     console.log(a);
//     yield B()
//     console.log('foo函数执行结束');
// }
// const it = foo() // it可迭代对象
// // console.log(it.next()); // { value: Promise { <pending> }, done: false }
// // console.log(it.next());
// // console.log(it.next());
// it.next().value.then(() => {
//     it.next().value.then(() => {
//         it.next()
//     })
// })




function* foo(x) {
    let y = 2 * (yield (x + 1))
    console.log(y);
    
    let z = yield (y / 3)
    return (x + y + z)
}
const it = foo(5)

console.log(it.next()); // { value: 6, done: false }
console.log(it.next(12)); // { value: 4, done: false }
console.log(it.next(13)); // { value: 21, done: true }
