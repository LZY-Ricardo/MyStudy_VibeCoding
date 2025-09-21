/**
 * 串行执行异步任务队列，并支持对失败任务进行指定次数的重试
 * 核心特点：前一个任务成功（或重试耗尽失败）后，才执行下一个任务（串行）；失败任务重试耗尽后直接抛出错误，终止后续任务
 * @param {Array<() => Promise<any>>} tasks - 异步任务数组，每个元素必须是「无参数且返回Promise的函数」（异步任务标准形式）
 * @param {number} [retries=0] - 单个任务失败后的最大重试次数（如retries=2表示：失败后最多再试2次，共执行3次）
 * @returns {Promise<Array<any>>} - 返回Promise：成功时resolve所有任务的结果数组（顺序与tasks一致）；失败时reject最终抛出的错误
 */
function executeTasks(tasks = [], retries = 0) {
    const results = []
    async function runTask(index, retryCount) {
        if (index >= tasks.length) { 
            return results
        }
        try {
            const result = await tasks[index]()
            results.push(result)
            return runTask(index + 1, retries)
        } catch (error) {
            if (retryCount > 0) {
                return runTask(index, retryCount - 1)
            } else {
                throw error
            }
        }
    }
    return runTask(0, retries)
}



// 模拟任务1：第一次失败，第二次成功（测试重试）
const task1 = (() => {
    let count = 0; // 记录执行次数
    return () => new Promise((resolve, reject) => {
        count++;
        console.log(`task1 执行第 ${count} 次`);
        if (count === 2) {
            resolve('task1 成功');
        } else {
            reject(new Error('task1 失败'));
        }
    });
})();

// 模拟任务2：一次成功（测试正常串行）
const task2 = () => {
    console.log('task2 开始执行');
    return Promise.resolve('task2 成功');
};

// 模拟任务3：总是失败（测试重试耗尽的情况）
const task3 = () => {
    console.log('task3 开始执行');
    return Promise.reject(new Error('task3 总是失败'));
};

console.log('=== 测试1：正常执行（task1重试1次后成功，task2正常执行） ===');
// 执行任务：重试次数设为1（任务1失败后重试1次）
executeTasks([task1, task2], 1)
    .then((res) => console.log('所有任务完成：', res)) // 输出：["task1 成功", "task2 成功"]
    .catch((err) => console.log('任务失败：', err.message));

console.log('\n=== 测试2：重试耗尽失败（task3重试2次后仍失败） ===');
// 测试重试耗尽的情况
setTimeout(() => {
    executeTasks([task3], 2)
        .then((res) => console.log('任务完成：', res))
        .catch((err) => console.log('任务最终失败：', err.message));
}, 1000);