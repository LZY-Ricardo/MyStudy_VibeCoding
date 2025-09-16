async function executeDependencyTree(tree) { 


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