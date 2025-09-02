let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok1')
        // reject('fail555')
    }, 1000)
})
p.then(
    (res) => {
        console.log('成功then1', res);
        return 'ok2'
    }, (err) => {
        console.log('失败', err);
        // return 'err2'
        return test('a')
    })
    .then((res) => {
        console.log('成功then2', res);
    })
    .catch((err) => {
        console.log('失败', err);
    })


function test(a) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(a);
            // resolve('ok1')
            reject('fail')
        }, 1000)
    })
}