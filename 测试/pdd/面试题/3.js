// 实现一个`diff(newObj, oldObj)`方法，找出`newObj`相对于`oldObj`的差异，具体要求如下：
// 1. 对一个`key`，`oldObj`中有，`newObj`中没有，或者值不相等，计为一个`diff`，反之不算`diff`；
// 2. 相等的判定：要求`===`，对象类型要求递归判断，直到`key`对应的值为基本类型；
// 3. 对象中叶子节点的`value`都是基本类型，基本类型仅需考虑`Undefined`、`Null`、`String`、`Number`、`Boolean`；
// 4. 输出要求：返回`diff`数组，数据项为字符串类型，值为`key`在`oldObj`中的路径，具体参考示例代码中的示例输出；
// 5. 输出要求：无任何`diff`时，返回空数组；

/**
 * 比较两个对象的差异，找出 oldObj 中存在但 newObj 中不存在或值不同的 key 路径
 * @param {any} newObj - 新对象
 * @param {any} oldObj - 旧对象（基准对象）
 * @returns {string[]} - 差异路径数组
 */
function diff(newObj, oldObj) { 
    const diffArr = []

    function compare(oldObj, newObj, oldKey = '') {
        // 相同直接返回
        if (oldObj === newObj) {
            return
        }
    
        // 都为对象去比较 key-value (排除 null)
        if (typeof newObj === 'object' && newObj !== null && typeof oldObj === 'object' && oldObj !== null) {
            const oldObjKeys = Object.keys(oldObj)
            const newObjKeys = Object.keys(newObj)
            // 获取新老对象的 key 值 
            for (let curKey of oldObjKeys) {
                let newKey = oldKey ? oldKey + '.' + curKey : curKey
                // 如果 newObj 中没有这个 key，或者值不相等
                if (!newObjKeys.includes(curKey)) {
                    diffArr.push(newKey)
                } else { // 递归比较 同时拥有的key 对应的 value值
                    compare(oldObj[curKey], newObj[curKey], newKey)
                }  
            } 
        } else { // 都是原始值直接比较
            if (oldKey && newObj !== oldObj) {
                console.log(newObj, oldObj);
                diffArr.push(oldKey)
            }
        }
        
    } 

    compare(oldObj, newObj)

    return diffArr
}
// 示例输入
const oldObj = {
    a: 1,
    b: {
        b1: true,
        b2: null,
    },
    c: {
        c1: 'foo',
        c2: 'bar',
    },
    d: null,
};
const newObj = {
    a: 1,
    b: {
        b1: false,
        b2: undefined,
    },
    c: {
        c1: 'foo',
        c2: 'barbar',
    },
};
console.log(diff(newObj, oldObj));
// 示例输出 ["b.b1", "b.b2", "c.c2", "d"];
