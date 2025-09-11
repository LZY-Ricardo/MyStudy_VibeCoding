function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

function trafficLight() {
    console.log('red');
    sleep(1000).then(() => {
        console.log('yellow');
        sleep(3000).then(() => {
            console.log('green');
            sleep(2000).then(() => {
                trafficLight()
            })
        })
    })
}
trafficLight()

