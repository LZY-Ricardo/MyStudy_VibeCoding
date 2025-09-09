let input = {
    a: 1,
    b: [1, 2, { c: true }, [3]],
    d: { e: 2, f: 3 },
    g: null,
    h: function () { },
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

function flattenObj(obj) {
    let res = {}
    function dfs(target, preKey) {
        for (let key in target) { // 遍历当前传入的变量
            let newKey = ''

            if (preKey) { // 有上一级 就拼接
                if (Array.isArray(target)) { // 数组 就拼接索引
                    newKey = `${preKey}[${key}]`
                } else { // 非数组 就拼接点
                    newKey = `${preKey}.${key}`
                }
            } else { // 没有上一级 就直接赋值
                newKey = key
            }

            // 递归 处理普通对象和数组
            if (target[key] && typeof target[key] === 'object' && !(target[key] instanceof Date) && !(target[key] instanceof RegExp)) {
                dfs(target[key], newKey)
            } else {
                if (target[key] instanceof Date) {
                    res[newKey] = new Date(target[key])
                } else if (target[key] instanceof RegExp) {
                    res[newKey] = new RegExp(target[key])
                } else {
                    res[newKey] = target[key]
                }
            }
        }
    }
    dfs(obj, null) // 递归入口 
    return res
}

let result = flattenObj(input)
console.log(result);
