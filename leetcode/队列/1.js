const arr = []
const arr2 = new Array(5).fill(new Array(5).fill(0))

// console.log(arr, arr2);
// console.log(arr2.length)

for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr2[i].length; j++) {
        if (i===0 && j === 0) {
            arr2[i][j] = 1
            console.log(arr2)
            return
        }
    }
}


