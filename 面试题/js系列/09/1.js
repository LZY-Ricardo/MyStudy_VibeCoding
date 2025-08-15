function Parent() {
    this.name = 'parent'
    this.like = ['a', 'b', 'c']

}
Child.prototype = new Parent()
function Child() {
    this.age = 18
}

let c = new Child()
let d = new Child()
c.like.push('d')
console.log(c.like)
console.log(d.like)


