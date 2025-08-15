Parent.prototype.say = function () {
    console.log('hello')
}
function Parent() {
    this.name = 'parent'
    this.like = ['a', 'b', 'c']

}
function Child() {
    this.age = 18
    Parent.call(this)

}

let c = new Child()
// let d = new Child()
// c.like.push('d')
console.log(c.say()) // c.say is not a function
// console.log(d)
