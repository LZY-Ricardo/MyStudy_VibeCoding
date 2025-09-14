function func() {
    return new Promise((resolve, reject) => {
        reject(111)
    })
}

func().catch((err) => {
    console.log(err);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(222)
            resolve(222)
        }, 1000);
    })
}).then(
    (value) => {
        console.log('then', value);
    },
    (err) => {
        console.log('catch', err);
    }
)