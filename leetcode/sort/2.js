const arr = [5, 3, 2, 4, 1]
//[1, 3, 2, 4, 5]
//[1, 2, 3, 4, 5]
//最小值

function selectionSort(arr){
    const len = arr.length
    let minIndex = 0
    for (let i = 0; i< len; i++){
        minIndex = i // 区间缩小一位
        // 从minIndex开始, 找到最小值
        const currentMin = getMin(minIndex, len - 1, arr)
        if (currentMin !== minIndex) {
            [arr[minIndex],arr[currentMin]] = [arr[currentMin],arr[minIndex]]
        }
    }
    return arr
}

function getMin(i, j, arr){
    let min = Infinity
    let o = 0
    for (let k = i; k <= j; k++){
        if(arr[k] < min){
            min = arr[k]
            o = k
        }
    }
    return o
}

console.log(selectionSort(arr));
