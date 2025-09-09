const list = [
    { id: 19, parentId: 0 },
    { id: 18, parentId: 16 },
    { id: 17, parentId: 16 },
    { id: 16, parentId: 0 },
    { id: 15, parentId: 19 },
    
]

// const result = convert(list, "parentId", "id", 0)
// console.log(JSON.stringify(result, null, 2));
console.log(JSON.stringify(constructTree(list, 0), null, 2));


function convert(list, parentKey, currentKey, rootValue) {
    let res = {
        [currentKey]: rootValue,
        children: []
    }

    let num = 0
    while (num !== list.length) {
        list.forEach((item, index) => {
            if (!item) return 
            // 收集最外层
            if (item[parentKey] === res[currentKey]) {
                res.children.push({
                    ...item,
                    children: []
                })
                list[index] = null
                num++
            } else {
                // 这条数据应该找哪一层的节点当父节点
                if (helpFn(item, index, res.children)) {
                    num++
                }
            }
        })
    }

    function helpFn(item, initIndex, arr) { // arr 为 res.children
        // children 为空 直接返回
        if (!arr.length) {
            return false
        } else {
            let index = arr.findIndex(i => i[currentKey] === item[parentKey])
            // res.children里面哪一条数据是当前数据的父节点
            if (index !== -1) { // 找到 item 的归属
                arr[index].children.push({
                    ...item,
                    children: []
                })
                list[initIndex] = null
                return true
            }
            // 不是res.children的子节点 继续找
            for (let i = 0; i < arr.length; i++) {
                if (helpFn(item, initIndex, arr[i].children)) {
                    return true
                }
            }
        }
    }

    return res
}



function constructTree(list, rootID) {
    let map = new Map();
    list.forEach(item => {
        if (!map.has(item.parentId)) {
            map.set(item.parentId, []);
        }
        map.get(item.parentId).push(item);
    })
    console.log(map);
    function dfs(nodeId) {
        let children = map.get(nodeId);
        if (!children) {
            return null;
        }

        let result = [];
        children.forEach(child => {
            let node = {
                id: child.id,
                parentId: child.parentId
            };

            let childNodes = dfs(child.id);
            if (childNodes) {
                node.children = childNodes;
            }

            result.push(node);
        });

        return result;
    }

    let root = {
        id: rootID,
        parentId: null,
        children: dfs(rootID)
    }
    return root;


}


// {
//     "id": 0,
//         "children": [
//             {
//                 "id": 19,
//                 "parentId": 0,
//                 "children": [
//                     {
//                         "id": 15,
//                         "parentId": 19,
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": 16,
//                 "parentId": 0,
//                 "children": [
//                     {
//                         "id": 18,
//                         "parentId": 16,
//                         "children": []
//                     },
//                     {
//                         "id": 17,
//                         "parentId": 16,
//                         "children": []
//                     }
//                 ]
//             }
//         ]
//   }