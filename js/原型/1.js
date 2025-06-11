Car.prototype.name = 'su7-Ultra'
Car.prototype.height = 1.4
Car.prototype.weight = 1.5
Car.prototype.long = 4800

function Car(color) {
    // this.name = 'su7-Ultra'
    // this.height = 1.4
    // this.weight = 1.5
    // this.long = 4800
    this.color = color
}

const car1 = new Car('orange')
const car2 = new Car('green')
console.log(car1.name)
console.log(car2.height)









