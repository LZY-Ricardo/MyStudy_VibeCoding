const a = 5924818152624811857n
const b = 21148488562n

function add(n, m) {
    let strm = m.toString()
    console.log(strm);
    let strn = n.toString()
    console.log(strn);
    let lenm = strm.length
    let lenn = strn.length
    if (lenm > lenn) {
        strn = strn.padStart(lenm, '0')
    } else {
        strm = strm.padStart(lenn, '0')
    }
    lenn = lenm

    let carry = 0, res = ''
    for (let i = lenm - 1; i >= 0; i--) {
        const num = Number(strm[i]) + Number(strn[i]) + carry
        carry = Math.floor(num/10)
        res = (num % 10) + res
    }
    if (carry) {
        res = carry + res
    }
    return +res
}

console.log(add(a, b));
console.log(a + b);






