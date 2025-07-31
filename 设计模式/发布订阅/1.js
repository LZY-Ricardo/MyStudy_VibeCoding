class EventEmitter {
    constructor() {
        this.eventList = {}
    }

    on(eventName, callback) {
        if (!this.eventList[eventName]) {
            this.eventList[eventName] = []
        }
        this.eventList[eventName].push(callback)
        // this.eventList[eventName] ? this.eventList[eventName].push(callback) : this.eventList[eventName] = [callback]
    }

    off(eventName, callback) {
        const callbacks = this.eventList[eventName]
        const index = callbacks.indexOf(callback)
        if (index !== -1) {
            callbacks.splice(index, 1)
        } 
    }

    once(eventName, callback) {
        const wrap = () => {
            callback()
            this.off(eventName, wrap)
        }
        this.on(eventName, wrap)
    }

    emit(eventName) {
        if (this.eventList[eventName]) {
            const handlers = this.eventList[eventName].slice() // 浅拷贝
            handlers.forEach(item => {
                item()
            })
        }
    }
}


let _event = new EventEmitter()
// console.log(_event);

function kang() {
    console.log('康买房');
}
function ji() {
    console.log('季买房');
}
function chen() {
    console.log('陈买车位');
    
}

_event.on('hasHouse', kang)
_event.once('hasHouse', ji)
// _event.off('hasHouse', ji)
_event.on('hasCarport', chen)

// console.log(_event);

_event.emit('hasHouse') // 发布 =》 kang ji 函数的调用
_event.emit('hasHouse') // 二次发布