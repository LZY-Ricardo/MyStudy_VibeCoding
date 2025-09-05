function sum(a, b, c, d) {
    return a + b + c + d
}

const currySum = curry(sum)

console.log(currySum(1)(2)(3)(4))

// function curry(fn, ...args) {
//     if (args.length < fn.length) {
//         return (...args2) => {
//             return curry(fn, ...args, ...args2)
//         }
//     } 
//     return fn(...args)
// }

function curry(fn) {
    return function (...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return curry(fn.bind(this, ...args))
        }
    }
}

let obj = {
    number: 66,
    sum: function(a, b, c, d) {
        // console.log(this.number); // undefined
        
        return a + b + c + d + this.number
    }
}
console.log(obj.sum(1, 2, 3, 4))
let curriedSum = curry(obj.sum)
console.log(curriedSum(1)(2)(3)(4))