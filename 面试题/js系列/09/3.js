Parent.prototype.say = function () {
    console.log('hello')
}
function Parent() {
    this.name = 'parent'
    this.like = ['a', 'b', 'c']

}
Child.prototype = new Parent()
Child.prototype.constructor = Child
function Child() {
    this.age = 18
    Parent.call(this)
}

let c = new Child()
let d = new Child()
d.like.push('d')
console.log(d.like);


console.log(c.like);
console.log(c.say);

console.log(c.constructor);



