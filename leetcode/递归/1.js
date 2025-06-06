// 5! === 5 * 4 * 3 * 2 * 1
// function mul(n) {
//     let num = 1
//     for (let i = n; i >= 1; i--) {
//         num *= i; // num = num * i
//     }
//     return num
// }

function mul(n) {
    if (n === 1) {
        return 1
    }
    return n * mul(n-1)
}

// mul(5) ==> 5 * mul(4) y
// mul(4) ==> 4 * mul(3) y
// mul(3) ==> 3 * mul(2) y
// mul(2) ==> 2 * mul(1) y
// mul(1) ==> 1

// mul(n) ===> n * mul(n-1)

console.log(mul(5));
