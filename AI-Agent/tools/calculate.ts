// 简单计算
function calculate(input: Record<string, string>): string {
    const expression = input['expression'] ?? ''
    try {
        // 只允许数字和基本运算符，防止注入
        if (!/^[\d\s+\-*/().]+$/.test(expression)) {
            return '只支持基本数学运算（+ - * /）'
        }
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${expression})`)() as number
        return `计算结果：${expression} = ${result}`
    } catch {
        return `计算失败：${expression} 不是合法的数学表达式`
    }
}

export default calculate