class Point {
    constructor(x, y) { // 构造器函数
        this.x = x
        this.y = y
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

    static toSum(a, b) { // 实例对象无法访问到static修饰的方法
        return a + b
    }
}

var p = new Point(1, 2)
console.log(p.toString())
console.log(p.toSum(1, 2))