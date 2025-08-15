let parent = {
    name: 'parent',
    like: ['a', 'b', 'c']
}

let child1 = Object.create(parent)
let child2 = Object.create(parent)
child1.like.push('d')
console.log(child1.like);
console.log(child2.like);


