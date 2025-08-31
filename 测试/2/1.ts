interface A  {
    name: string,
}

// interface A {
//     age: number
// }

interface B extends A {
    age: number,
}
let user: B = {
    name: '张三',
    age: 18
}
console.log(user);
