function trafficLight() {
    console.log('red');
    setTimeout(() => {
        console.log('yellow');
        setTimeout(() => {
            console.log('green');
            setTimeout(() => {
                trafficLight()
            }, 2000)
        }, 3000)
    }, 1000)
    
}
trafficLight()
