// 要能判断自己是否已经被实例化过
class SingleDog {
    show() {
        console.log('我是一个单身狗')
    }
    static getInstance() {
        if (!SingleDog.instance){
        SingleDog.instance = new SingleDog()
        }
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
console.log(s1 === s2) // false

