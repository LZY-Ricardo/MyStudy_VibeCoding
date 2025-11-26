class Singleton {
    constructor() {
        // 私有构造函数，防止外部直接实例化
    }
    
    static getInstance() {
        if (!Singleton.instance)
            Singleton.instance = new Singleton();
        return Singleton.instance;
    }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true

function Singleton2() {
    this.instance = null;
    // 私有属性，防止外部直接访问
}
Singleton2.getInstance = function() {
    if (!this.instance)
        this.instance = new Singleton();
    return this.instance;
}

const instance3 = Singleton2.getInstance();
const instance4 = Singleton2.getInstance();

console.log(instance3 === instance4); // true
