const p1 = new Promise((resolve) => {
    console.log('p1')
    resolve('p1成功')
})

const p2 = new Promise((resolve) => { 
    console.log('p2')
    resolve(p1)
})
// console.log(p1)
// console.log(p2)

p2.then(() => {
    console.log(1)
})
    .then(() => {
    console.log(2)
})
.then(() => {
    console.log(3)
})

p1.then(() => {
    console.log(4)
})
.then(() => {
    console.log(5)
})
.then(() => {
    console.log(6)
})
