// 要能判断自己是否已经被实例化过
class SingleDog {
    show() {
        console.log('我是一个单身狗')
    }
}
SingleDog.getInstance = (function() {
    let instance = null
    return function() {
        if (!instance) {
            instance = new SingleDog()
        }
        return instance
    }    
})()

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
s1.show()
console.log(s1 === s2) // true

