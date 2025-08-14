let obj = {
    name: 'sss',
    age: 18,
    like: ['music', 'game'],
    a: undefined,
    b: null,
    // c: function() {},
    // e: Symbol('sss'),
    f: 123n

}
obj.e = {}
obj.e.n = obj


function deepClone(obj) {
    return new Promise((resolve, reject) => {
        const { port1, port2 } = new MessageChannel()
        port1.postMessage(obj)
        port2.onmessage = (msg) => {
            resolve(msg.data)
        }
    })
}
const cloneObj = deepClone(obj)
cloneObj.then(res => {
    obj.like.push('run')
    console.log(res);
}).catch(err => {
    console.log(err);
})



