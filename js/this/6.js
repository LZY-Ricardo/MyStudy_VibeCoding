function Person() {
    // var obj = {}
    // Person.call(obj)
    this.name = '路明非'
    this.age = 18
    console.log(this)
    // Object.__proto__ = Person.prototype
    // return obj
}
const p1 = new Person()