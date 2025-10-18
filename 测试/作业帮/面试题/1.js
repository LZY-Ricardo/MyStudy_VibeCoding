/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param numbers int整型一维数组 
 * @return bool布尔型
 */
function IsContinuous(numbers) {
    // write code here
    numbers.sort((a, b) => a - b)
    let zc = 0
    let gap = 0

    for (let i = 0; i < numbers.length; i++) {
        // console.log(numbers[i])
        if (numbers[i] === 0) {
            // console.log(1, numbers[i])
            zc++
            continue
        }

        if (i > 0 && numbers[i] === numbers[i - 1]) {
            // console.log(2, numbers[i])
            return false
        }

        if (i > 0 && numbers[i - 1] !== 0) {
            // console.log(3, numbers[i])
            if (numbers[i] === 6) {
                console.log(333, numbers[i] - numbers[i - 1] - 1)
            }
            gap += numbers[i] - numbers[i - 1] - 1
        }
        // console.log(gap)
    }
    return gap <= zc

}
console.log(IsContinuous([1, 3, 2, 6, 4]))