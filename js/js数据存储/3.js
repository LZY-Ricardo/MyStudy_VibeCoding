// function foo() {
//     var a = 1
//     var b = a
//     a = 2
//     console.log(a); // 2
//     console.log(b); // 1
// }
// foo()


function foo() {
    var a = {name: '路明非'}
    var b = a
    a.name = '路鸣泽'
    console.log(a); // {name: '路鸣泽'}
    console.log(b); // {name: '路鸣泽'}
}
foo()

