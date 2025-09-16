const arr = [5, 3, 2, 4, 1]

// function bubbleSort(arr) {
//     const n = arr.length
//     for (let i = 0; i < n; i++) {
//         for (let j = 1; j < n - i; j++) {
//             if (arr[j] < arr[j - 1]) {
//                 [arr[j], arr[j - 1]] = [arr[j - 1],arr[j]]
//             }
//         }
//     }
//     return arr
// }
// console.log(bubbleSort(arr));


// function selectSort(arr) {
//     let len = arr.length
//     for (let i = 0; i < len; i++) {
//         let minIndex = i
//         for (let j = i + 1; j < len; j++) {
//             if (arr[j] < arr[minIndex]) {
//                 minIndex = j
//             }
//         }
//         [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
//     }
//     return arr
// }
// console.log(selectSort(arr));


// function insertSort(arr) {
//     let len = arr.length
//     for (let i = 1; i < len; i++) {
//         for (let j = i; j > 0; j--) {
//             if (arr[j] < arr[j - 1]) {
//                 [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
//             }
//         }
//     }
//     return arr
// }
// console.log(insertSort(arr));



// function mergeSort(arr) {
//     let len = arr.length
//     if (len <= 1) return arr
//     // 切割
//     const mid = Math.floor(len / 2)
//     const leftArr = mergeSort(arr.slice(0, mid))
//     const rightArr = mergeSort(arr.slice(mid))
//     return mergeArr(leftArr, rightArr)
// }

// function mergeArr(arr1, arr2) {
//     let i = 0, j = 0
//     const len1 = arr1.length
//     const len2 = arr2.length

//     const res = []

//     while (i < len1 && j < len2) {
//         if (arr1[i] < arr2[j]) {
//             res.push(arr1[i])
//             i++
//         } else {
//             res.push(arr2[j])
//             j++
//         }
//     }
//     while (i < len1) {
//         res.push(arr1[i])
//         i++
//     }
//     while (j < len2) {
//         res.push(arr2[j])
//         j++
//     }

//     return res
// }

// console.log(mergeSort(arr));


function quickSort(arr) {
    let len = arr.length
    if (len <= 1) return arr

    let mid = Math.floor(len / 2)
    let left = []
    let right = []

    for (let i = 0; i < len; i++) {
        if (i !== mid) {
            if (arr[i] < arr[mid]) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
    }
    return [...quickSort(left), arr[mid], ...quickSort(right)]
}
console.log(quickSort(arr));
