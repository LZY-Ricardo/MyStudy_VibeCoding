/**
 * 串行执行异步任务队列，并支持对失败任务进行指定次数的重试
 * 核心特点：前一个任务成功（或重试耗尽失败）后，才执行下一个任务（串行）；失败任务重试耗尽后直接抛出错误，终止后续任务
 * @param {Array<() => Promise<any>>} tasks - 异步任务数组，每个元素必须是「无参数且返回Promise的函数」（异步任务标准形式）
 * @param {number} [retries=0] - 单个任务失败后的最大重试次数（如retries=2表示：失败后最多再试2次，共执行3次）
 * @returns {Promise<Array<any>>} - 返回Promise：成功时resolve所有任务的结果数组（顺序与tasks一致）；失败时reject最终抛出的错误
 */
function executeTasks(tasks = [], retries = 0) {
    const results = []
    return new Promise((resolve, reject) => {
        function runTask(index, retryCount) {
            tasks[index]().then(
                (value) => {
                    results.push(value)
                    if (index + 1 < tasks.length) {
                        runTask(index + 1, retries)
                    } else {
                        resolve(results)
                    }
                },
                (reason) => {
                    if (retryCount > 0) {
                        runTask(index, retryCount - 1)
                    } else {
                        reject(reason)
                    }
                }
            ) 
        }
        runTask(0, retries)
    })
}



// 测试代码
const makeTask = (index) => {
    return () => {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                return Math.random() > 0.5 ? resolve(`task ${index} success`) : reject(new Error(`task ${index} failed`));
            }, 100);
        });
    };
};

const tasks = [
    makeTask(0),
    makeTask(1),
    makeTask(2),
    makeTask(3),
    makeTask(4),
    // 可继续添加任务
];

async function test() {
    try {
        const res = await executeTasks(tasks, 3);
        console.log('所有任务都成功：', res);
    } catch (error) {
        console.log('有任务失败：', error);
    }
}
test()