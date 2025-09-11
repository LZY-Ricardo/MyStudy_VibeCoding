function sleep(color, time) {
    return new Promise(resolve => {
        console.log(color);
        setTimeout(resolve, time)
    })
}

// async function trafficLight() {
//     await sleep('red', 1000)
//     await sleep('yellow', 3000)
//     await sleep('green', 2000)
//     trafficLight()
// }
// trafficLight()

function trafficLight() {
    sleep('red', 1000)
    .then(() => sleep('yellow', 3000))
    .then(() => sleep('green', 2000))
    .then(() => trafficLight())
}
trafficLight()