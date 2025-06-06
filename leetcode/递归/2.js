 // 1 1 2 3 5 8 13 21
 function fib(n) {
    if (n === 1 || n === 2) {
        return 1
    }
    return fib(n-1) + fib(n-2)
 }

 console.log(fib(10));

//  fib(10) ===> fib(9) + fib(8)
//  fib(9) ===> fib(8) + fib(7)
//  fib(8) ===> fib(7) + fib(6)
//  fib(7) ===> fib(6) + fib(5)
//  fib(6) ===> fib(5) + fib(4)
//  fib(5) ===> fib(4) + fib(3)
//  fib(4) ===> fib(3) + fib(2)
//  fib(3) ===> fib(2) + fib(1)
//  fib(2) ===> 1
//  fib(1) ===> 1




