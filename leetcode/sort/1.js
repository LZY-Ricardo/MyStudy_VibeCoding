const arr= [5, 3, 2, 4, 1]
//[3, 2, 4, 1, 5]
//[2, 3, 1, 4, 5]
//[2, 1, 3, 4, 5]
//[1, 2, 3, 4, 5]
//究竟要执行多少次才停下呢?

// 冒泡排序
function bubbleSort(arr){
    const len = arr.length
    for (let i = 0; i < len - 1; i++){ // 要比较的轮数
        for (let j = 0; j < len - i - 1; j++){ // arr[j]
            //如果前面的数比后面的大,就交换位置
            if (arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
console.log(bubbleSort(arr));
