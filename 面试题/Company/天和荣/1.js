const cpuIntensiveTask = new Promise((resolve) => {
    resolve()
}).then(async () => {
    while (true) { 
        // 模拟 CPU 密集型任务
    }
})

const normalTask = new Promise((resolve) => { 
    resolve('ok')
}).then((res) => {
    console.log('normalTask',res);
})

await Promise.all([cpuIntensiveTask, normalTask]).then(() => {
    console.log('all done');
})
