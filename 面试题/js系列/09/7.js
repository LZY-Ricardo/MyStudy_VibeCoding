// function Parent() {
//     this.Name = 'parent'
//     this.like = ['a', 'b', 'c']
// }
// Parent.prototype.getName = function() {
//     return this.Name
// }
// Parent.say = function() {
//     console.log('hello');
// }


// const arr = []
// console.log(Array.isArray(arr));



class Parent {
    constructor() {
        this.Name = 'parent'
        this.like = ['a', 'b', 'c']
    }
    getName() {
        return this.Name
    }
    static say() {
        console.log('hello');
    }
}

class Child extends Parent {
    constructor() {
        super()
        this.age = 18
    }

}

let p = new Parent()
console.log(p.getName());

let c = new Child()
console.log(c.getName());

