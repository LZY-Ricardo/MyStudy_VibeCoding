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

// ajax(10000)
// ajax(8000)
// ajax(1000)
// ajax(4000)
// ajax(3000)
// ajax(7000)

class Limit {
    constructor(parallCount = 2) {
        this.parallCount = parallCount // 最大并发数
        this.tasks = [] // 维持一个任务队列
        this.runningCount = 0 // 记录当前正在运行的任务数量
    }
    add(task) { // 新增一个任务
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject,
            })
            this._run()
        })
    }

    _run() {
        if (this.runningCount < this.parallCount && this.tasks.length) {
            const {task, resolve, reject }= this.tasks.shift()
            this.runningCount++
            task().then((res) => {
                resolve(res)
                this.runningCount--
                this._run()
            }).catch((res) => {
                this.runningCount--
                reject(res)
                this._run()
            })
            // task().then(resolve, reject).finally(() => {
            //     this.runningCount--
            //     this._run()
            // })
        }
    }
}

const limit = new Limit(2)
// limit.add(() => ajax(10000))
// limit.add(() => ajax(8000))
// limit.add(() => ajax(1000))
// limit.add(() => ajax(4000))
// limit.add(() => ajax(3000))
// limit.add(() => ajax(7000))

function addTask(time, name) {
    limit
    .add(() => ajax(time))
    .then((res) => {
        console.log(`任务${name}完成`, res);
        
    })
    .catch((res) => {
        console.log(`任务${name}失败`, res);
    })
}

addTask(10000, '1')
addTask(4000, '2')
addTask(2000, '3')
addTask(5000, '4')
addTask(1000, '5')
addTask(7000, '6')

