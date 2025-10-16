async function async1() {
    console.log(1) // 1
    const res = await async2()
    console.log(res) // 5
    console.log('AAA') // 6
}

async function async2() {
    console.log(2); // 2
    return Promise.resolve(3) 
}

async1()

Promise.resolve()
    .then(() => {
        console.log(4); // 3
    })
    .then(() => {
        console.log(5); // 4
    })          
    .then(() => {
        console.log(6); // 7
    })



