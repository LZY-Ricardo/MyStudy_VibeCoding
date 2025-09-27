function matchVersions(versions, match) {
    // 解析版本号为 [主版本, 次版本, 修补版本]，不足三位补0
    function parseVersion(version) {
        const parts = version.split('.').map(Number);
        while (parts.length < 3) {
            parts.push(0);
        }
        return parts;
    }

    // 比较两个版本号，返回 1（v1>v2）、0（相等）、-1（v1<v2）
    function compareVersion(v1, v2) {
        for (let i = 0; i < 3; i++) {
            if (v1[i] > v2[i]) return 1;
            if (v1[i] < v2[i]) return -1;
        }
        return 0;
    }

    const result = [];
    for (const version of versions) {
        const vParts = parseVersion(version);
        let isMatch = false;

        if (match.startsWith('^')) {
            // 处理 ^ 兼容版本规则
            const mStr = match.slice(1);
            const mParts = parseVersion(mStr);
            if (vParts[0] === mParts[0] &&
                compareVersion(vParts, mParts) >= 0 &&
                compareVersion(vParts, [mParts[0] + 1, 0, 0]) < 0) {
                isMatch = true;
            }
        } else if (match.startsWith('~')) {
            // 处理 ~ 近似版本规则
            const mStr = match.slice(1);
            const mParts = parseVersion(mStr);
            if (vParts[0] === mParts[0] && vParts[1] === mParts[1] &&
                compareVersion(vParts, mParts) >= 0 &&
                compareVersion(vParts, [mParts[0], mParts[1] + 1, 0]) < 0) {
                isMatch = true;
            }
        } else if (match.includes('.')) {
            // 处理 主.次 版本规则（如 1.2）
            const mParts = parseVersion(match);
            if (vParts[0] === mParts[0] && vParts[1] === mParts[1]) {
                isMatch = true;
            }
        } else {
            // 处理 主版本 规则（如 1）
            const mMain = parseInt(match);
            if (vParts[0] === mMain) {
                isMatch = true;
            }
        }

        if (isMatch) {
            result.push(version);
        }
    }
    return result;
}

// 测试用例集合
const testCases = [
    {
        name: "主版本匹配（如 '1'）",
        versions: ["1.0.0", "1.2.3", "1.9.9", "2.0.0", "0.9.9", "1.10.0"],
        match: "1",
        expected: ["1.0.0", "1.2.3", "1.9.9", "1.10.0"]
    },
    {
        name: "主.次版本匹配（如 '1.2'）",
        versions: ["1.2.0", "1.2.3", "1.2.9", "1.3.0", "2.2.0", "1.1.9"],
        match: "1.2",
        expected: ["1.2.0", "1.2.3", "1.2.9"]
    },
    {
        name: "^兼容版本（如 '^1.2.3'）",
        versions: ["1.2.3", "1.2.4", "1.3.0", "1.9.9", "2.0.0", "1.2.2", "0.9.9"],
        match: "^1.2.3",
        expected: ["1.2.3", "1.2.4", "1.3.0", "1.9.9"]
    },
    {
        name: "^兼容版本边界测试（主版本为0）",
        versions: ["0.2.3", "0.2.4", "0.3.0", "1.0.0", "0.2.2"],
        match: "^0.2.3",
        expected: ["0.2.3", "0.2.4"] // 注意：0.x版本的^匹配通常只兼容补丁版本
    },
    {
        name: "~近似版本（如 '~1.2.3'）",
        versions: ["1.2.3", "1.2.4", "1.2.9", "1.3.0", "1.1.9", "2.2.3"],
        match: "~1.2.3",
        expected: ["1.2.3", "1.2.4", "1.2.9"]
    },
    {
        name: "~近似版本（只有主.次版本）",
        versions: ["1.2.0", "1.2.5", "1.3.0", "1.1.9", "2.2.0"],
        match: "~1.2",
        expected: ["1.2.0", "1.2.5"]
    },
    {
        name: "版本号位数不足三位的情况",
        versions: ["1", "1.2", "1.2.3", "2", "2.3"],
        match: "1",
        expected: ["1", "1.2", "1.2.3"]
    },
    {
        name: "无匹配版本的情况",
        versions: ["2.0.0", "2.1.0", "3.0.0"],
        match: "1",
        expected: []
    },
    {
        name: "包含预发布版本号（应忽略预发布部分）",
        versions: ["1.2.3-beta", "1.2.3", "1.3.0-alpha", "2.0.0"],
        match: "^1.2.3",
        expected: ["1.2.3-beta", "1.2.3", "1.3.0-alpha"]
    }
];

// 执行测试
function runTests() {
    testCases.forEach((test, index) => {
        const result = matchVersions(test.versions, test.match);
        const isPassed = JSON.stringify(result) === JSON.stringify(test.expected);

        console.log(`测试用例 ${index + 1}: ${test.name}`);
        console.log(`  输入版本:`, test.versions);
        console.log(`  匹配规则: ${test.match}`);
        console.log(`  实际结果:`, result);
        console.log(`  预期结果:`, test.expected);
        console.log(`  测试${isPassed ? '通过' : '失败'}\n`);
    });
}

// 运行测试
runTests();