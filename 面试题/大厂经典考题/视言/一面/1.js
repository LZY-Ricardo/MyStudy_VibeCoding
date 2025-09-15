let arr = [1, 2, 3, 2, 1]

function equal(arr) {
    // let res = []
    // for (let i = 0; i < arr.length; i++) {
    //     let res = []
    //     if (res.indexOf(arr[i]) === -1) {
    //         res.push(arr[i])
    //     }
    // }
    // return 
    
    arr.sort()
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] === arr[i + 1]) {
    //         arr.splice(i, 1)
    //         i--
    //     }
    // }
    for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] === arr[i - 1]) {
            arr.splice(i, 1)
        }
    }
    return arr
}
console.log(equal(arr));

