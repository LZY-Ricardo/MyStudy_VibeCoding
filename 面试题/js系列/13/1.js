console.log(1);
setTimeout(() => {
    console.log(2);
    setTimeout(() => {
        console.log(6);
    }, 0);
    new Promise((resolve) => {
        console.log(7);
        resolve(8);
    }).then(res => {
        console.log(res);
    })
}, 0);
new Promise((resolve) => {
    console.log(3);
    resolve(4);
}).then(res => {
    console.log(res);
})
console.log(5);
