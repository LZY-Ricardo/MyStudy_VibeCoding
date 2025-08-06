const arr = [56, 12, 98, 62, 23]

// console.log(arr.includes('gzip'))

// const res = arr.some((item, i, array) => {
//     return item === 'gzip'
// })

const res = arr.every((item, i, array) => {
    return item >= 10
})


console.log(res)
