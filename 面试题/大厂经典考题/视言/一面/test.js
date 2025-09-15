class Parent {
    constructor(name) {
        this.name = name
    }
    say() {
        console.log(this);
        
        console.log('我是父类的方法');
    }
}
class Child extends Parent {
    constructor(name, age) {
        super(name)
        this.name = 'child'
        this.age = 18
    }
}
let c = new Child('张三') // c.__proto__ == Child.prototype == new Parent()
console.log(c);
c.say()
