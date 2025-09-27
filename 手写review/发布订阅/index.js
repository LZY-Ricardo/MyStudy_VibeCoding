/**
 * 发布订阅模式实现 - EventEmitter 类
 * 修复了原代码中的属性名不一致、splice使用错误、参数传递等问题
 */
class EventEmitter {
    constructor() {
        // 统一使用 events 属性存储事件
        this.events = {}
    }

    /**
     * 订阅事件
     * @param {string} eventName - 事件名称
     * @param {function} callback - 回调函数
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        } 
        this.events[eventName].push(callback)
    }

    /**
     * 取消订阅事件
     * @param {string} eventName - 事件名称
     * @param {function} callback - 要移除的回调函数
     */
    off(eventName, callback) {
        const callbacks = this.events[eventName]
        
        // 修复：添加边界情况处理
        if (!callbacks) return
        
        const index = callbacks.indexOf(callback)
        if (index !== -1) {
            // 修复：正确使用 splice，直接修改原数组
            callbacks.splice(index, 1)
        }
        
        // 优化：如果事件列表为空，删除该事件
        if (callbacks.length === 0) {
            delete this.events[eventName]
        }
    }

    /**
     * 一次性订阅事件
     * @param {string} eventName - 事件名称
     * @param {function} callback - 回调函数
     */
    once(eventName, callback) {
        // 修复：支持参数传递
        const wrap = (...args) => {
            callback(...args)  // 传递所有参数
            this.off(eventName, wrap)
        }
        this.on(eventName, wrap)
    }

    /**
     * 触发事件
     * @param {string} eventName - 事件名称
     * @param {...any} args - 传递给回调函数的参数
     */
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            const handlers = this.events[eventName].slice()
            // 修复：支持参数传递
            handlers.forEach((item) => item(...args))
        }
    }
}

let _event = new EventEmitter()

function event1() {
    console.log('事件1');
}

function event2() {
    console.log('事件2');
}

function event3() {
    console.log('事件3');
}

_event.on('event1', event1)
_event.once('event2', event2)
_event.on('event3', event3)

_event.emit('event1')
_event.emit('event2')
_event.emit('event3')
_event.emit('event1')
_event.emit('event2') // 事件2 只触发一次
_event.emit('event3')