function ajax(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (time > 5000) {
                reject(time)
            }
            resolve(time)
        }, time)
    })
}

/**
 * 并发控制类 - 限制同时执行的任务数量
 * 主要问题：缺少错误处理和边界情况处理
 */
class Limit {
    constructor(max) {
        this.max = max || 1 // 添加默认值防止传入0或undefined
        this.tasks = []
        this.runningCount = 0
    }
    
    /**
     * 添加任务到队列
     * @param {Function} task - 返回Promise的任务函数
     * @returns {Promise} 任务执行结果的Promise
     */
    add(task) {
        // 参数校验
        if (typeof task !== 'function') {
            return Promise.reject(new Error('任务必须是一个函数'))
        }
        
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task: task,
                resolve,
                reject
            })
            this.run()
        })
    }

    /**
     * 执行任务队列
     * 问题修复：
     * 1. 原代码在任务执行失败时可能导致runningCount不准确
     * 2. 缺少对task()执行异常的捕获
     */
    run() {
        // 当有待执行任务且未达到并发上限时执行
        while (this.tasks.length > 0 && this.runningCount < this.max) {
            const { task, resolve, reject } = this.tasks.shift()
            this.runningCount++
            
            // 包装任务执行，确保异常也能被正确处理
            this.executeTask(task, resolve, reject)
        }
    }
    
    /**
     * 执行单个任务的包装方法
     * @param {Function} task - 任务函数
     * @param {Function} resolve - 成功回调
     * @param {Function} reject - 失败回调
     */
    executeTask(task, resolve, reject) {
        try {
            // 执行任务并处理结果
            const taskPromise = task()
            
            // 确保task返回的是Promise
            if (!taskPromise || typeof taskPromise.then !== 'function') {
                throw new Error('任务函数必须返回一个Promise')
            }
            
            taskPromise
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.runningCount--
                    // 任务完成后继续执行队列中的任务
                    this.run()
                })
        } catch (error) {
            // 捕获task()执行时的同步异常
            this.runningCount--
            reject(error)
            this.run()
        }
    }
    
    /**
     * 获取当前状态信息（用于调试）
     * @returns {Object} 当前状态
     */
    getStatus() {
        return {
            maxConcurrency: this.max,
            runningCount: this.runningCount,
            pendingCount: this.tasks.length
        }
    }
}

// 测试用例
const limit = new Limit(2)

function addTask(time, name) {
    console.log(`添加任务${name}，预计耗时${time}ms`)
    
    limit
        .add(() => ajax(time))
        .then((res) => {
            console.log(`✅ 任务${name}完成，耗时: ${res}ms`)
        })
        .catch((res) => {
            console.log(`❌ 任务${name}失败，耗时: ${res}ms (超过5000ms限制)`)
        })
}

console.log('=== 开始执行并发控制测试 ===')
console.log('最大并发数:', limit.max)

addTask(4000, '1') // 成功
addTask(2000, '2') // 成功  
addTask(6000, '3') // 失败（超时）
addTask(1000, '4') // 成功
addTask(3000, '5') // 成功
addTask(7000, '6') // 失败（超时）

// 监控执行状态
const statusInterval = setInterval(() => {
    const status = limit.getStatus()
    if (status.runningCount === 0 && status.pendingCount === 0) {
        console.log('\n=== 所有任务执行完毕 ===')
        clearInterval(statusInterval)
    } else {
        console.log(`当前状态 - 运行中: ${status.runningCount}, 等待中: ${status.pendingCount}`)
    }
}, 1000)

