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
    let times = 0
    return new Promise((resolve, reject) => {
        const repeat = () => {
            fn()
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                times++
                if (times < count) {
                    console.log('重试第' + times + '次');  
                    repeat()
                } else {
                    console.log('重试了' + times + '次，还失败了');
                    reject(err)
                }
            })
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

