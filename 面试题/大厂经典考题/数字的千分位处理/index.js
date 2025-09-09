const oldNum = 19489811645155.22 // 19,489,811,645,155.22

// function toThousand(num) {
//     const [integer, decimal] = String.prototype.split.call(num, '.')    
//     const arr = []
//     let j = 0
//     for (let i = integer.length - 1; i >= 0; i--) {
//         arr.unshift(integer[i])
//         j++
//         if (j % 3 === 0 && i !== 0) {
//             arr.unshift(',')
//         }
//     }
//     // arr.join('')
//     // console.log(arr);
//     if (decimal) {
//         return `${arr.join('')}.${decimal}`
//     }
//     return arr.join('')
// }


// function toThousand(num) {
//     const [integer, decimal] = String.prototype.split.call(num, '.')
//     const arr = []
//     let path = ''
//     for (let i = integer.length - 1; i >= 0; i--) {
//         path = integer[i] + path
//         if (path.length % 3 === 0) {
//             arr.unshift(path)
//             path = ''
//         }
//     }
//     if (path) {
//         arr.unshift(path)
//     }
//     let res = arr.join(',')
//     if (decimal) {
//         res += '.' + decimal
//     }
//     return res
// }

function toThousand(num) {
    let [integer, decimal] = String.prototype.split.call(num, '.')
    integer = integer.replace(/\d{1,3}(?=(\d{3})+$)/g, `$&,`)
    // console.log(integer);
    return `${integer}${decimal ? '.' + decimal : ''}`
}

console.log(toThousand(oldNum));
