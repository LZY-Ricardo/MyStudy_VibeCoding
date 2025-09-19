let obj = {
    a: 1,
    b: 2,
    c: {
        d: 3,
        e: 4
    }
}
let keys = Object.getOwnPropertySymbols(obj)
console.log(keys);
