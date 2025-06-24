function myInstanceOf(L, R) {
    L = L.__proto__
    while(L) {
        if (L === R.prototype) return true
        L = L.__proto__
    }
    return false
}

console.log(myInstanceOf([], Array)) // true
console.log(myInstanceOf([], Object));


function Parent() {}
Child.prototype = new Parent()

function Child() {}
let c = new Child()
c.__proto__ = Child.prototype.__proto__ = Parent.prototype