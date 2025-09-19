let arr = [
    { name: '张三', age: 18, like: { n: 'running' } },
    { name: '李四', age: 19 },
    { name: '张三', age: 18, like: { n: 'running' } },
    { name: '王五', age: 18 },
]

function uniqueByJSON(arr) {
    arr.forEach((item, index) => {
        arr[index] = JSON.stringify(item)
    })
    const set = new Set(arr)
    let iterator = set.keys()
    // console.log(iterator.next());
    const res = []
    while (1) {
        const { done, value } = iterator.next()
        if (!done) {
            res.push(JSON.parse(value))
        } else {
            break
        }
    }
    return res
}
// console.log(uniqueByJSON(arr));

function unique(arr) {
    return arr.reduce((pre, cur, index) => {
        // 判断当前元素是否已经存在结果数组中
        if (!pre.some((item) => equal(item, cur))) {
            pre.push(cur)
        }
        return pre
    }, [])
}

function unique2(arr) {
    let res = []
    let flag = false
    for (let i = 0; i < arr.length; i++) {
        flag = false
        for (let j = 0; j < res.length; j++) {
            if (equal(res[j], arr[i])) {
                flag = true
                break
            }
        }
        if (!flag) {
            res.push(arr[i])
        }
    }
    return res
}

function equal(v1, v2) {
    // 处理基本类型的比较
    if (v1 === v2) {
        return true
    }
    
    // 如果都是对象且不为null，进行深度比较
    if ((typeof v1 === 'object' && v1 !== null) && (typeof v2 === 'object' && v2 !== null)) {
        let keys1 = Object.keys(v1)
        let keys2 = Object.keys(v2)
        
        // 属性数量不同，直接返回false
        if (keys1.length !== keys2.length) {
            return false
        }
        
        // 遍历所有属性进行递归比较
        for (let key of keys1) {
            // 修复：应该检查key是否存在于v2中，而不是keys2数组中
            if (!(key in v2)) {
                return false
            }
            // 递归比较属性值，如果任何一个属性不相等就返回false
            if (!equal(v1[key], v2[key])) {
                return false
            }
        }
        return true
    }
    
    // 其他情况都返回false（包括一个是对象一个不是对象的情况）
    return false
}
console.log(unique2(arr));
