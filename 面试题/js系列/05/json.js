let obj = {
    name: 'sss',
    age: 18,
    like: ['music', 'game'],
    a: undefined,
    b: null,
    c: function() {},
    e: Symbol('sss'),
    // f: 123n

}
obj.f = {}
obj.f.n = obj

const newObj = JSON.parse(JSON.stringify(obj))

obj.like.push('run')
console.log(obj, newObj);

