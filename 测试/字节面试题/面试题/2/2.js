var versions = ['1.45.0', '1.5', '6', '3.3.3.3.3.3.3'];

// 自定义比较函数
function compareVersions(a, b) {
    const arrA = a.split('.').map(Number)
    const arrB = b.split('.').map(Number)
    console.log(arrA, arrB);
    
    // 遍历两个数组的每一段
    for (let i = 0; i < Math.max(arrA.length, arrB.length); i++) {
        // 取当前段的数字, 不足的补0
        const numA = arrA[i] || 0
        const numB = arrB[i] || 0
        console.log(numA, numB);
        console.log('------');

        // 如果当前段的数字不同, 则返回结果
        if (numA > numB) {
            console.log('numA > numB');
            return 1
        }
        if (numA < numB) {
            console.log('numA < numB');
            return -1
        }
    }

    // 如果所有段的数字都相同, 则返回0
    console.log('所有段的数字都相同');
    return 0
}

versions.sort(compareVersions)

console.log(versions);
// 输出：['1.5', '1.45.0', '3.3.3.3.3.3.3', '6']
