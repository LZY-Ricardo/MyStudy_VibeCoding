// function foo(x = 1, y = 10) {
//     return x + y
// }

// console.log(foo(3, 4));

// function foo(a,...arg) {
//     // console.log(arguments) // argument 代表函数接收到的所有参数 类数组
//     console.log(arg);
    
// }
// foo(1, 2, 3, 4)

const foo = () => {
    console.log(this);
}
foo()
