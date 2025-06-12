// function foo() {
//     console.log(this); // 浏览器上打印 window
// }
// foo()
// console.log(this) // 浏览器上打印 window

{
    let a = this;
    console.log(a) // 浏览器上打印 window
}
