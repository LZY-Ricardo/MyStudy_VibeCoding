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