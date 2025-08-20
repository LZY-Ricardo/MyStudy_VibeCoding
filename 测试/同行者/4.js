// 找出不大于n的最大质数
function search(n) {
    let res = 0;
    for (let i = 2; i <= n; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            res = i;
        }
    }
    return res;
}