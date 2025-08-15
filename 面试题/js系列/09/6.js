Parent.prototype.getName = function() {
    return this.Name
}
function Parent() {
    this.Name = 'parent'
    this.like = ['a', 'b', 'c']
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
function Child() {
    this.age = 18
    Parent.call(this)
}
let c1 = new Child()
console.log(c1.getName());
console.log(c1.constructor);



