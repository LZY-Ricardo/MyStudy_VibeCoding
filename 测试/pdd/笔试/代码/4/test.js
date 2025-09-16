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


async function run(promise) {
    const res = await promise
    return res
}

console.log(run(createRandomTask('task1', 1000)))
