let parent = {
    name: 'parent',
    like: ['a', 'b', 'c']
}

function clone(origin) {
    let cloneObj = Object.create(origin)
    cloneObj.getLike = function() {
        return this.like
    }
    return cloneObj
}
let child1 = clone(parent)
let child2 = clone(parent)
child1.like.push('d')
console.log(child1.like);
console.log(child2.like);
console.log(child1.getLike());
console.log(child2.getLike());



