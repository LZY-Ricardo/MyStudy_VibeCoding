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
    // 构造函数
}

Singleton2.getInstance = function() {
    if (!Singleton2.instance)
        Singleton2.instance = new Singleton2();
    return Singleton2.instance;
}

const instance3 = Singleton2.getInstance();
const instance4 = Singleton2.getInstance();

console.log(instance3 === instance4); // true
         

function Singleton3() {    
    // 构造函数
    this.show = () => {
        console.log('show')
    }
}
Singleton3.getInstance = (function () {
    let instance = null
    return function () {
        if (!instance) instance = new Singleton3();
        return instance;
    }
}())

const instance5 = Singleton3.getInstance();
const instance6 = Singleton3.getInstance();
instance5.show()

console.log(instance5 === instance6); // true
