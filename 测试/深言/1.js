function strAdd(str1, str2) {
    let result = ''
    let carry = 0
    let i = str1.length - 1
    let j = str2.length - 1
    while (i >= 0 || j >= 0 || carry > 0) {
        const dig1 = i >= 0 ? parseInt(str1[i]) : 0
        const dig2 = j >= 0 ? parseInt(str2[j]) : 0
        const sum = dig1 + dig2 + carry
        result = (sum % 10) + result
        carry = Math.floor(sum / 10)
        i--
        j--
    }
    return result
}
// input： strAdd('1', '1')
// output: '2'
// input: strAdd('11', '99')
// output: '110'
// input: strAdd('11', '999999999999999999')
strAdd('1', '1')
console.log(strAdd('1', '1'));

console.log(strAdd('11', '99'));

console.log(strAdd('11', '9999999999999999999999999999999999999'));

// console.log(11n + 999999999999999999n);
