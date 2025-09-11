let input = {
    a: 1,
    b: [1, 2, {c: true}, [3]],
    d: {e: 2,f: 3},
    g: null,
    h: function() {},
    e: new Date(),
    i: new RegExp('\\w+')
}

let output = {
    a: 1,
    'b[0]': 1,
    'b[1]': 2,
    'b[2].c': true,
    'b[3][0]': 3,
    'd.e': 2,
    'd.f': 3,
    g: null,
    h: 'function() {},',
    e: '2023-08-10T08:00:00.000Z',
    i: '\\w+',
}

// console.log(output);


function flattenObj(obj) {
    let res = {}
    function dfs(target, oldKey) {
        for (let key in target) {
            let newKey = ''
            if (oldKey) {
                if (Array.isArray(target)) {
                    newKey = `${oldKey}[${key}]` // oldKey + '[' + key + ']'
                } else {
                    newKey = `${oldKey}.${key}` // oldKey + '.' + key
                }
            } else {
                newKey = key
            }

            if (target[key] && typeof target[key] === 'object' && !(target[key] instanceof Date) && !(target[key] instanceof RegExp)) { // 走递归
                // console.log(key);
                dfs(target[key], newKey)
            } else {
                console.log(target[key]);
                
                if (target[key] instanceof Date) {
                    console.log('是日期对象');
                    res[newKey] = new Date(target[key])
                } else if (target[key] instanceof RegExp) {
                    res[newKey] = target[key].toString()
                } else {
                    // console.log(target[key]);
                    res[newKey] = target[key]
                }
            }
        } 
    }
    dfs(obj, '')
    return res
}
console.log(flattenObj(input));
