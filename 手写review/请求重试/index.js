function ajax(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.floor(Math.random() * 10)
            if (random < 8) {
                reject('失败')
            } else {
                resolve('成功请求数据')
            }
        }, 500)
    })
}

function retry(fn, count) {
    let times = count
    return new Promise((resolve, reject) => {
        function repeat() {
            fn().then(
                (value) => {
                    resolve(value)
                },
                (reason) => {
                    
                    if (times > 0) {
                        times--
                        console.log(`请求失败,还剩${times}次机会`);
                        repeat()
                    } else {
                        reject(reason)
                    }
                }
            )
        }
        repeat()
    })
}

retry(ajax, 3)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

