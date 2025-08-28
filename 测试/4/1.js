function foo() {
    let count = 0
    setTimeout(() => {
        count = count + 1
    }, 1000)
    console.log('第一次'+count);
    
    setTimeout(() => {
        count++
    }, 1000)
    console.log('第二次'+count);

    return count
}

console.log(foo());
console.log(foo());
