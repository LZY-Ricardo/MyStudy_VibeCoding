Promise.resolve('原始值')
    .finally((res) => {
        console.log(111,res); // undefined
        
        return '新值'; // 这个返回值会被忽略
    })
    .then(value => {
        console.log(value); // 输出: '原始值'
    });


Promise.resolve('成功')
    .finally(() => {
        throw new Error('finally 中的错误');
    })
    .catch(error => {
        console.log(error.message); // 输出: 'finally 中的错误'
    });


Promise.resolve('成功')
    .finally(() => {
        // return Promise.reject('finally 拒绝');
        return Promise.resolve('finally 接收')
    })
    .then(value => {
        console.log(value);

    })
    .catch(error => {
        console.log(error); // 输出: 'finally 拒绝'
    });