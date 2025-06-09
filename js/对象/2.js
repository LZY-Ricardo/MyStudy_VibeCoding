// function add(x, y) {
//     return x + y;
// }
// add(1, 2) // 3

// function Car(color) {
//     this.name = 'su7-Ultra'
//     this.height = '1400'
//     this.lang = '4800'
//     this.weight = 1500
//     this.color = color
// }

// var car1 = new Car('orange'); // 实例化一个对象
// var car2 = new Car('pink'); 

// car1.name = '劳斯莱斯'

// console.log(car1)
// console.log(car2)

function Person(name,age,sex) {
    // var _this = {}
    _this.name = name,
    _this.age = age,
    _this.sex = sex
    // return _this
}

var p1 = Person('路明非', 18, '男')

console.log(p1)