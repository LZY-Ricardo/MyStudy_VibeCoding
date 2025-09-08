function foo1() {
    return new Promise((resolve, reject) => {
        console.log('foo1');
        // resolve('foo1成功')
        reject('foo1失败')
        console.log('foo1执行完毕');
    })
}
function foo2() {
    return new Promise((resolve, reject) => {
        console.log('foo2');
        // resolve('foo2成功')
        reject('foo2失败')
        console.log('foo2执行完毕');
    })
}

foo1()
    .then(
        (res) => {
            console.log(`成功1：${res}`);
            // return foo2()
            return ('then1成功')
        },
        (err) => {
            console.log(`失败1: ${err}`);
            // return foo2()
            return 1
        }
    )
    .then(
        (res) => {
            console.log(`成功2：${res}`);
        },
        (err) => {
            console.log(`失败2: ${err}`);
        }
    )