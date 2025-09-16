/**
 * @param {Function[]} tasks 异步任务函数数组
 * @param {number} retries 最大重试次数
 * @return {Promise<any[]>} promise 返回值为所有任务结果的数组
 */
function executeTasks(tasks = [], retries = 0) {
    // 你的实现
    const results = [];
    let index = 0
    return new Promise(async (resolve, reject) => {
        async function runTask(task, retryCount) {
            return task().then(
                (res) => {
                    results.push(res)
                    index++
                    if (index < tasks.length) {
                        return runTask(tasks[index], retries)
                    }
                    return res
                },
                (err) => {
                    if (--retryCount > 0) {
                        return runTask(task,retryCount)
                    }
                    reject(err)
                }
            )
        }
        try {
            await runTask(tasks[index], retries)
            resolve(results)
        } catch (error) {
            reject(error)
        }
    })
}

// 测试代码
const makeTask = (index) => {
    return () => {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                return Math.random() > 0.9 ? resolve(`task ${index} success`) : reject(new Error(`task ${index} failed`));
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

// executeTasks(tasks, 3).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })
