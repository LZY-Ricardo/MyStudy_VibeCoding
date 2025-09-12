setTimeout(() => {
    console.log(1);
}, 20);

console.log(2);

setTimeout(() => {
    console.log(3);
}, 10);

console.log(4);

for (let i = 0; i < 90000000; i++) {
    // do soming 80ms左右
}

console.log(5);

setTimeout(() => {
    console.log(6);
}, 8);

console.log(7);

setTimeout(() => {
    console.log(8);
}, 15);

console.log(9);