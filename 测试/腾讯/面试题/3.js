for (var i = 0; i < 4; i++) { // 将 var 改成 let
    setTimeout(() => {
        console.log(i)
    }, 500)
}

for (let i = 0; i < 4; i++) { // 将 var 改成 let
    setTimeout(() => {
        console.log(i)
    }, 500)
}

for (var i = 0; i < 4; i++) { // 使用立即执行函数创建闭包
    (function (j) {
        setTimeout(() => {
            console.log(j)
        }, 500)
    })(i)
}

for (var i = 0; i < 4; i++) { // 使用 setTimeout 第三个参数
    setTimeout((j) => {
        console.log(j)
    }, 500, i)
}

for (var i = 0; i < 4; i++) { // 使用bind方法
    setTimeout(function (j) {
        console.log(j)
    }.bind(null, i), 500)
}

for (var i = 0; i < 4; i++) { // 使用 try catch 捕获错误 创建块级作用域
    try {
        throw i
    } catch (j) {
        setTimeout(() => {
            console.log(j)
        }, 500)
    }
}

function createTimeout(index) { // 使用额外的函数封装
    setTimeout(() => {
        console.log(index)
    }, 500)
}
for (var i = 0; i < 4; i++) {
    createTimeout(i)
}