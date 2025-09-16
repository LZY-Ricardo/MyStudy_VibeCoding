/*
* —— 请在此处实现 mergeIntervals 函数 ——
*/
function mergeIntervals(intervals) { 
    const res = [] // 结果数组
    for (let i = 0; i < intervals.length; ) { // 遍历数组
        let j = i + 1 // 记录下一个区间
        let pre = intervals[i] // 前一个区间 初始化为当前区间 再去判断是否能合并下一个数组区间
        while (j < intervals.length) { // 遍历下一个区间 
            if (pre[1] >= intervals[j][0]) { // 前一个区间的结束大于等于下一个区间的开始 说明能合并
                if (pre[1] < intervals[j][1]) { // 确定合并下一个区间后的 结尾位置为多少
                    pre = intervals[j]
                }
            } else {
                break
            }
            j++
        }
        res.push([intervals[i][0], pre[1]])
        i = j
    }
    return res
}

/*
* —— 以下为测试代码，请勿修改 ——
*/
function compareArray(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][0] !== arr2[i][0] || arr1[i][1] !== arr2[i][1]) {
            return false;
        }
    }
    return true;
}

function runTest() {
    console.log("—— 测试开始 ——");

    // 测试用例
    const testCases = [
        {
            input: [
                [1, 3],
                [2, 6],
                [8, 10],
                [15, 18]
            ],
            expected: [
                [1, 6],
                [8, 10],
                [15, 18]
            ]
        }
        // 可添加更多测试用例
    ];

    let allPass = true;
    testCases.forEach((testCase, index) => {
        const result = mergeIntervals(testCase.input);
        const isEqual = compareArray(result, testCase.expected);
        if (isEqual) {
            console.log(`测试用例 ${index + 1} 执行通过`);
        } else {
            allPass = false;
            console.log(`测试用例 ${index + 1} 执行失败`);
            console.log(`输入: ${JSON.stringify(testCase.input)}`);
            console.log(`预期输出: ${JSON.stringify(testCase.expected)}`);
            console.log(`实际输出: ${JSON.stringify(result)}`);
        }
    });

    if (allPass) {
        console.log("—— 所有测试用例执行通过 ——");
    } else {
        console.log("—— 部分测试用例执行失败 ——");
    }
}

// 调用测试函数
runTest();