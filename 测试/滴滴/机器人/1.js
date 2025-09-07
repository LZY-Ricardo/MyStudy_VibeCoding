const readline = require('readline')
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

r1.on('line', (line) => {
    let countU = 0, countD = 0, countL = 0, countR = 0
    for (const char of line) {
        switch (char) {
            case ('U'): {
                countU++
                break
            }
            case ('D'): {
                countD++
                break
            }
            case ('R'): {
                countR++
                break
            }
            case ('L'): {
                countL++
                break
            }
        }
    }
    // 计算垂直和水平方向的不平衡量
    const verticalDiff = Math.abs(countU - countD);
    const horizontalDiff = Math.abs(countR - countL);
    
    // 总不平衡量
    const totalDiff = verticalDiff + horizontalDiff;
    
    // 最小修改次数：总不平衡量除以2（因为每次修改可以修正2个单位的不平衡）
    const res = totalDiff / 2;
    console.log(res);
    r1.close()
})