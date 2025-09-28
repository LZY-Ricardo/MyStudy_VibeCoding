function a() {
    return new Promise((resolve, reject) => {
        reject()
    })
}

a()
    .then(
        () => {
            console.log(111)
        },
        () => {
            console.log(222)
            throw new Error('error')
            return Promise.resolve()

        }
    ).then(
        () => {
            console.log(333)
        },
        () => {
            console.log(444)
        }
    )
    .catch(
        () => {
            console.log(555)
        }
    )
