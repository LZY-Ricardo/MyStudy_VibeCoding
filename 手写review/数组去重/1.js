const arr = [1, 5, 6, 1, 5, 6, 4, 0, 1, 9, 9, 5]

function unique(arr) {
    arr.sort((a, b) => a - b)
    let newArr = [arr[0]]
    let r = 1
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] !== arr[r]) {
            newArr.push(arr[r])
        }
        r++
    }
    return newArr
}
// console.log(unique(arr));


function unique(arr) {
    arr.sort((a, b) => a - b)
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] === arr[i - 1]) {
            arr.splice(i, 1)
        }
    }
    return arr
}
console.log(unique(arr));
