// 红绿黄灯算法 各自亮灯时长是 3s, 2s, 1s

setInterval(() => {
    console.log('红');

    setTimeout(() => {
        console.log('绿');

        setTimeout(() => {
            console.log('黄');
        }, 2000)
    }, 3000)
    
}, 6000)

function timePromise(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

function setColor(color, time) {
    console.log(color);
    return timePromise(time)
}

function foo() {
    setColor('红', 3000).then(() => {
        setColor('绿', 2000).then(() => {
            setColor('黄', 1000).then(() => {
                foo()
            })
        })
    })
}

// async function run() {
//     await setColor('红', 3000)
//     await setColor('绿', 2000)
//     await setColor('黄', 1000)
//     run()
// }
// run()
