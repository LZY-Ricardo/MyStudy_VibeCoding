// 需要给speak 和 identify 显示传入一个上下文对象

// function identify(context) {
//     return context.name.toUpperCase()
// }

// function speak(context) {
//     var greeting = 'hello, I am ' + identify(context)
//     console.log(greeting);
// }

// var me = {
//     name: 'Ricardo'
// }

// speak(me)


function identify() {
    return this.name.toUpperCase()
}

function speak() {
    var greeting = 'hello, I am ' + identify.call(this)
    console.log(greeting);
}

var me = {
    name: 'Ricardo'
}

speak.call(me)