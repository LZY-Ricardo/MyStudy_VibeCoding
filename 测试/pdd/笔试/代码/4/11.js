async function executeDependencyTree(tree) {
    const result = {} // 存储结果
    const executingTasks = new Set() // 正在执行的任务
    const completedTasks = new Set() // 已经完成的任务

    async function executeTask(taskName) {
        // 如果任务已完成，直接返回结果
        if (completedTasks.has(taskName)) {
            return result[taskName]
        }

        // 如果任务正在执行，等待其完成
        if (executingTasks.has(taskName)) {
            while (!completedTasks.has(taskName)) {
                await new Promise(resolve => {
                    setTimeout(resolve, 10)
                })
            }
            return result[taskName]
        }

        // 标记任务开始执行
        executingTasks.add(taskName)

        try {
            // 先执行依赖任务
            if (tree[taskName].dependencies) {
                await Promise.all(tree[taskName].dependencies.map(dep => executeTask(dep)))
            }

            // 执行当前任务
            result[taskName] = await tree[taskName].task()
            
            // 标记任务完成
            completedTasks.add(taskName)
            
            return result[taskName]
        } catch (error) {
            // 任务失败时也要从执行集合中移除
            executingTasks.delete(taskName)
            throw error
        }
    }

    // 获取所有任务名称并并行执行
    const taskNames = Object.keys(tree)
    await Promise.all(taskNames.map(taskName => executeTask(taskName)))
    
    return result
}

function runTest() {
    console.log('--- 测试开始 ---');

    // 模拟一个随机耗时、可能失败的异步任务
    const createRandomTask = (name, delay, willFail = false) => () =>
        new Promise((resolve, reject) => {
            console.log(`[Task] ${name} 开始执行...`);
            setTimeout(() => {
                if (willFail) {
                    console.log(`[Task] ${name} 执行失败！`);
                    reject(new Error(`${name} failed`));
                } else {
                    console.log(`[Task] ${name} 执行完毕，耗时 ${delay}ms`);
                    resolve(`${name}_result`);
                }
            }, delay);
        });

    const dependencyTree = {
        'task-A': {
            task: createRandomTask('task-A', 300)
        },
        'task-B': {
            task: createRandomTask('task-B', 200)
        },
        'task-C': {
            task: createRandomTask('task-C', 300),
            dependencies: ['task-A'] // C 依赖 A
        },
        'task-D': {
            task: createRandomTask('task-D', 150),
            dependencies: ['task-A', 'task-B'] // D 依赖 A 和 B
        },
        'task-E': {
            task: createRandomTask('task-E', 100),
            dependencies: ['task-C'] // E 依赖 C
        }
    };

    // 预期成功执行
    executeDependencyTree(dependencyTree).then(results => {
        console.log('--- 所有任务成功完成，结果如下 ---');
        console.log(JSON.stringify(results, null, 2));
        /* 期望输出
        {
          "task-A": "task-A_result",
          "task-B": "task-B_result",
          "task-C": "task-C_result",
          "task-D": "task-D_result",
          "task-E": "task-E_result"
        }
        */
    }).catch(error => {
        console.error('--- 错误：不应该捕获错误 ---', error);
    });

    // 预期失败执行
    const failTree = {
        'task-A': {
            task: createRandomTask('task-A', 500)
        },
        'task-B': {
            task: createRandomTask('task-B', 200, true) // B 任务失败
        },
        'task-C': {
            task: createRandomTask('task-C', 300),
            dependencies: ['task-A', 'task-B'] // C 依赖 A 和 B
        }
    };

    executeDependencyTree(failTree).then(results => {
        console.error('--- 错误：不应该成功 ---', results);
    }).catch(error => {
        console.log('--- 捕获到任务失败，符合预期 ---', error.message);
    });
}
runTest()