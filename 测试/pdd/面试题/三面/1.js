console.log(typeof A); // function
console.log(typeof B); // undefined
function A() {
    return 'A';
}
console.log(A()); // A
console.log(new A()); // A {}


console.log(typeof new A()); // object
console.log(typeof A()); // string
const obj = {};
var B = function () {
    return obj;
}
console.log(new B()); // {}
console.log(B()); // {}

console.log(new B() === obj); // true
console.log(B() === obj); // true