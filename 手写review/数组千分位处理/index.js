const oldNum = 19489811645155.22 // 19,489,811,645,155.22

console.log(toThousand(oldNum));


function toThousand(oldNum) {
    let [integer, decimal] = oldNum.toString().split('.')
    let newInteger = integer.replace(/\d{1,3}(?=(\d{3})+$)/g, `$&,`)
    return newInteger + '.' + decimal
}

function toThousand(oldNum) {
    let newNum
    let [integer, decimal] = String.prototype.split.call(oldNum, '.')    
    let path = ''
    let res = []
    for (let i = integer.length - 1; i >= 0; i--) {
        path = integer.charAt(i) + path
        // console.log(path);
        
        if (path.length === 3) {
            res.unshift(path)
            path = ''
        }
    }
    if (path) {
        res.unshift(path)
    }
    let newInteger = res.map(Number).join(',')
    newNum = newInteger + '.' + decimal
    return newNum
}

