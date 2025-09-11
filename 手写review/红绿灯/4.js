function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

async function trafficLight() {
    console.log('red');
    await sleep(1000)
    console.log('yellow');
    await sleep(3000)
    console.log('green');
    await sleep(2000)
    trafficLight()
}

trafficLight()