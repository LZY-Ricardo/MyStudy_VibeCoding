let parent = {
    name: 'parent',
    like: ['a', 'b', 'c']
}
let grandparent = {
    name2: 'grandparent',
    like2: ['a', 'b', 'c']
}

// 方法1：使用Object.setPrototypeOf实现多重继承
// let child1 = Object.create(parent);
// Object.setPrototypeOf(parent, grandparent);

// 方法2（可选）：使用Object.assign
let child1 = Object.create(parent);
Object.assign(child1, grandparent);

let child2 = Object.create(parent)
child1.like.push('d')
console.log(child1.like);
console.log(child2.like);
console.log(child1);
console.log(child1.__proto__);
console.log(Object.getPrototypeOf(child1));





