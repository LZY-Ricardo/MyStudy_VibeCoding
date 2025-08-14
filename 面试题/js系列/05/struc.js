let obj = {
    name: 'sss',
    age: 18,
    like: ['music', 'game'],
    a: undefined,
    b: null,
    // c: function() {},
    // e: Symbol('sss'),
    // f: 123n
}
obj.f = {}
obj.f.n = obj

const newObj = structuredClone(obj)
newObj.like.push('run')
console.log(obj, newObj);
