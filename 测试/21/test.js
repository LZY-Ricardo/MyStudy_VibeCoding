function sort(arr) {
    const n = arr.length
    let left = 0;
    let right = n - 1
    let newArr = []
    while (left < right) {
        newArr.push(arr[left])
        newArr.push(arr[right])
        left++
        right--
    }
    if (arr.length % 2 !== 0) {
        newArr.push(arr[left])
    }
    return newArr
}
const arr = [0, 1, 2, 3, 4, 5,6] 
console.log(sort(arr))
