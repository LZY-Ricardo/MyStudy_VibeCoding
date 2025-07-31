# 发布订阅模式与观察者模式

## 发布订阅模式

- 发布订阅模式是一种设计模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，当这个主题对象在状态上发生改变时，会通知所有的观察者对象，使它们能够执行各自的操作。

- 发布者不直接接触订阅者，而是通过一个第三方（事件中心）来进行通信。

- 特点：
  - 松耦合：发布者和订阅者完全解耦，互不了解对方的存在
  - 三个角色：发布者、订阅者、事件中心
  - 适用于跨组件/模块通信

- 代码示例（1.js）：
```javascript
class EventEmitter {
    constructor() {
        this.eventList = {}
    }

    on(eventName, callback) {
        if (!this.eventList[eventName]) {
            this.eventList[eventName] = []
        }
        this.eventList[eventName].push(callback)
    }

    emit(eventName) {
        if (this.eventList[eventName]) {
            const handlers = this.eventList[eventName].slice()
            handlers.forEach(item => {
                item()
            })
        }
    }
}

// 使用方式
let _event = new EventEmitter()
_event.on('hasHouse', kang)  // 订阅
_event.emit('hasHouse')      // 发布
```

## 观察者模式

- 观察者模式中，发布者（被观察者）直接接触到订阅者（观察者）。

- 特点：
  - 紧耦合：被观察者知道观察者的存在
  - 两个角色：观察者和被观察者
  - 适用于组件间紧密协作的场景

- 代码示例（3.html）：
```javascript
function observer(value) {
    // 直接更新 DOM
    h2.innerHTML = value
}

Object.defineProperty(obj, 'count', {
    set(value) {
        observer(value) // 直接调用观察者
        num = value
    }
})
```

## 两种模式的区别

| 特性 | 观察者模式 | 发布订阅模式 |
|------|------------|---------------|
| 耦合度 | 紧耦合 | 松耦合 |
| 通信方式 | 直接通信 | 间接通信 |
| 组件数量 | 两个角色 | 三个角色 |
| 了解对方 | 被观察者知道观察者 | 发布者和订阅者互不了解 |
| 使用场景 | 组件间紧密协作 | 跨组件/模块通信 |

## 应用场景

- 观察者模式：Vue的响应式系统
- 发布订阅模式：Node.js的EventEmitter，浏览器的事件机制
观察者   = (通知变更) =》 被观察者