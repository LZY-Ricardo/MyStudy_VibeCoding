const obj = {
    add1() {
        this.flag = true;
    },
    add2: () => {
        this.state = true;
    }
};
let son = {};
son.__proto__ = obj;
console.log(son.__proto__);
son.add1();
son.add2();
console.log(son);

console.log(obj.flag);
console.log(obj.state);
console.log(son.flag);
console.log(son.state);