function foo(time, state) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(state)
            resolve()

        }, time);
    })
}

async function trafficLight() {
    while (true) {
        await foo(1000, 'red')
        await foo(2000, 'green')
        await foo(3000, 'blue')
    }
}
trafficLight()

function trafficLight() {
    foo(1000, 'red')
        .then(() => {
            return foo(2000, 'green')
        })
        .then(() => {
            return foo(3000, 'blue')
        })
        .then(() => trafficLight()) // 递归调用
}
trafficLight()
