const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (equation) => {
    // 提取未知数（唯一的小写字母）
    const varChar = equation.match(/[a-z]/)[0];
    // 分割方程为左右两部分
    const [left, right] = equation.split('=');
    // 解析左右部分的系数和常数项
    const { coeff: leftCoeff, const: leftConst } = parsePart(left, varChar);
    const { coeff: rightCoeff, const: rightConst } = parsePart(right, varChar);
    // 移项计算：(leftCoeff - rightCoeff) * x = rightConst - leftConst
    const a = leftCoeff - rightCoeff;
    const b = rightConst - leftConst;
    const x = b / a;
    // 格式化输出（保留三位小数，处理0的特殊情况）
    const result = x.toFixed(3).replace(/\.?0+$/, '.000');
    console.log(`${varChar}=${result}`);
    rl.close();
});

/**
 * 解析方程的一部分（左或右），返回未知数系数和常数项
 * @param {string} part - 方程的一部分（左或右）
 * @param {string} varChar - 未知数字符
 * @returns {object} - 包含coeff（系数）和const（常数项）的对象
 */
function parsePart(part, varChar) {
    let coeff = 0;
    let constVal = 0;
    // 确保所有项以+或-开头，方便分割
    part = part.replace(/^([^+-])/, '+$1');
    // 按+或-分割所有项
    const items = part.match(/[+-][^+-]*/g) || [];
    for (const item of items) {
        if (item.includes(varChar)) {
            // 处理未知数项（如a、2a、-a）
            let numStr = item.replace(varChar, '');
            numStr = numStr === '' || numStr === '+' ? '1' : numStr === '-' ? '-1' : numStr;
            coeff += parseInt(numStr, 10);
        } else {
            // 处理常数项（如1、-5、10086）
            constVal += parseInt(item, 10);
        }
    }
    return { coeff, const: constVal };
}