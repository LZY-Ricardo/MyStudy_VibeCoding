function A() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A');
            resolve('A成功')
            // reject('A失败')
            console.log('6666666666');
            
        }, 1000)
    })
}
function B() {
    setTimeout(() => {
        console.log('B');
    }, 1000)
}
// A().then(
//     (res) => {
//         console.log(res);
//     },
//     (err) => {
//         console.log(err);
//     }
// )
// .catch(() => {
//     console.log('A错误');
// })
A().then(123)