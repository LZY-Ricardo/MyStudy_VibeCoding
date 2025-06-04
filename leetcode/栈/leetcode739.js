let temperatures = [73,74,75,71,69,72,76,73];
// 维护一个单调递减的栈
// [76, 73]
// [1, 1, 4, 2, 1, 1, 0, 0]

var dailyTemperatures = function(temperatures) {
    const len = temperatures.length;
    const stack = []; // 递减栈
    const res = new Array(len).fill(0); // 初始化结果数组

    for (let i = 0; i < len; i++) {
        // temperatures[i]
        while (stack.length &&temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const top = stack.pop();
            res[top] = i -top

        }

        stack.push(i); // 入栈
    }

    return res;
};

console.log(dailyTemperatures(temperatures));  // 1 1 4 2 1 1 0 0