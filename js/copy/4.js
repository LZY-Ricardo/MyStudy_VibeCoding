let obj = {
    name: 'Ricardo',
    age: 20,
    like: {
        a: '唱',
        b: '跳',
        c: 'rap'
    },
    a: undefined,
    b: null,
    c: function() {},
    d: Symbol('something for nothing'),
    // e: 666n
    e: {}
}
// obj.a = obj.e
// obj.e.n = obj.a 


let newObj = JSON.parse(JSON.stringify(obj))
obj.like.a = 'basketball'
console.log(obj);
console.log(newObj);
