var a = 1
function foo() {
    console.log(this.a); // obj.a
}

// var obj = {
//     a: 2,
//     foo: foo() 
// }
// obj.foo // 1

var obj = {
    a: 2,
    foo: foo 
}
var obj2 = {
    a: 3,
    obj: obj
}
obj2.obj.foo() // 2
