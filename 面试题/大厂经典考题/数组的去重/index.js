let arr = [1, 2, 3, 3, 1, 2, 2, 4]

// let newArr = [...new Set(arr)]
// console.log(newArr)

// function unique() {
//     let res = []
//     for (let item of arr) {
//         if (!res.includes(item)) {
//             res.push(item)
//         }
//     }
//     return res
// }
// console.log(unique(arr))

function unique(arr) {
    arr.sort((a, b) => a - b)
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] === arr[i + 1]) {
    //         arr.splice(i, 1)
    //         i--
    //     }
    // }
    for (let i = arr.length; i > 0; i--) {
        if (arr[i] === arr[i - 1]) {
            arr.splice(i, 1) // arr.splice(i - 1, 1) 效果一样
        }
    }
}
unique(arr)
console.log(arr)
