function formatByte(bytes) {
    if (bytes === 0) {
        return '0B';
    }
    const units = ['GB', 'MB', 'KB', 'B'];
    const divisors = [1024 ** 3, 1024 ** 2, 1024, 1];
    for (let i = 0; i < units.length; i++) {
        const divisor = divisors[i];
        if (bytes >= divisor) {
            let value = bytes / divisor;
            if (units[i] === 'B') {
                if (!value.toString().includes('.')) {
                    return `${value}${units[i]}`;
                }
                value = value.toFixed(1);
                return `${value}${units[i]}`;
            } else {
                value = value.toFixed(1);
                return `${value}${units[i]}`;
            }
        }
    }
    return '0B';
}

// 测试用例集合
const testCases = [
    // 基础功能测试
    { name: "0字节", input: 0, expected: "0B" },
    { name: "1字节", input: 1, expected: "1B" },
    { name: "1023字节", input: 1023, expected: "1023B" },
    { name: "1KB", input: 1024, expected: "1.0KB" },
    { name: "1.5KB", input: 1536, expected: "1.5KB" },
    { name: "1MB", input: 1024 * 1024, expected: "1.0MB" },
    { name: "2.3MB", input: 2.3 * 1024 * 1024, expected: "2.3MB" },
    { name: "1GB", input: 1024 * 1024 * 1024, expected: "1.0GB" },
    { name: "5.8GB", input: 5.8 * 1024 * 1024 * 1024, expected: "5.8GB" },

    // 边界值测试
    { name: "接近1KB的字节数", input: 1023, expected: "1023B" },
    { name: "超过1KB但不足2KB", input: 1500, expected: "1.5KB" },
    { name: "接近1MB的KB数", input: 1023 * 1024, expected: "1023.0KB" },
    { name: "超过1MB但不足2MB", input: 1.2 * 1024 * 1024, expected: "1.2MB" },
    { name: "接近1GB的MB数", input: 1023 * 1024 * 1024, expected: "1023.0MB" },

    // 带小数的字节数测试
    { name: "带小数的字节（需四舍五入）", input: 1234, expected: "1.2KB" }, // 1234/1024 ≈ 1.205 → 1.2
    { name: "刚好需要一位小数的字节", input: 1536, expected: "1.5KB" }, // 1536/1024 = 1.5
    { name: "多位小数的大数值", input: 123456789, expected: "117.7MB" }, // 123456789/(1024^2) ≈ 117.738...

    // 特殊情况测试
    { name: "极大数值", input: 1024 ** 4, expected: "1024.0GB" },
    { name: "极小数值（非零）", input: 0.5, expected: "0.5B" }, // 注意：实际应用中字节通常为整数
    { name: "刚好需要四舍五入的情况", input: 1024 + 512 - 1, expected: "1.5KB" } // 1535/1024 ≈ 1.499 → 1.5
];

// 执行测试
function runTests() {
    testCases.forEach((test, index) => {
        const result = formatByte(test.input);
        const isPassed = result === test.expected;

        console.log(`测试用例 ${index + 1}: ${test.name}`);
        console.log(`  输入: ${test.input} 字节`);
        console.log(`  实际输出: ${result}`);
        console.log(`  预期输出: ${test.expected}`);
        console.log(`  测试${isPassed ? '通过' : '失败'}\n`);
    });
}

// 运行测试
runTests();