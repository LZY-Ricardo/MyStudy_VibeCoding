const list = [
    { id: 19, parentId: 0 },
    { id: 18, parentId: 16 },
    { id: 17, parentId: 16 },
    { id: 16, parentId: 0 },
    { id: 15, parentId: 19 },

]

const result = convert(list, 0)
console.log(JSON.stringify(result, null, 2));
// console.log(JSON.stringify(constructTree(list, 0), null, 2));


function convert(list, rootValue) {
    let res = {
        id: rootValue,
        children: []
    }
    let num = 0 // 用于计数已经处理了多少个节点
    while (num !== list.length) { // 所有节点处理完就结束循环
        list.forEach((item, index) => {
            if (!item) return
            // 检查 res.children 里面哪一个加点是当前节点的父节点
            if (item.parentId === res.id) {
                res.children.push({
                    id: item.id,
                    parentId: item.parentId,
                    children: []
                })
                list[index] = null
                num++
            } else {
                // 去 res.children 的节点的子节点里面去找
                if (helpFn(item, res.children)) {
                    list[index] = null
                    num++
                } 
            }
        })
    }
    function helpFn(item, tree) {
        for (let root of tree) {  // 遍历 res.children 里面的节点
            if (root.id === item.parentId) {
                root.children.push({
                    id: item.id,
                    parentId: item.parentId,
                    children: []
                })
                return true
            }
        }
        for (let root of tree) { // 遍历 res.children 里面的节点的子节点
            if (root.children.length > 0) {
                return helpFn(item, root.children)
            }
        }
        return false
    }
    return res
}



function constructTree(list, rootID) {
    let map = new Map()
    list.forEach((item) => {
        const { id, parentId } = item
        if (!map.has(parentId)) {
            map.set(parentId, [])
        }
        map.set(parentId, [...map.get(parentId), id])
    })
    // console.log(map);
    // Map(3) { 0 => [ 19, 16 ], 16 => [ 18, 17 ], 19 => [ 15 ] }
    let tree = {
        id: rootID,
        children: null
    }
    function dfs(currentID, parentId) {
        let root = {
            id: currentID,
            parentId,
            children: []
        }
        if (map.get(currentID)) {
            for (let child of map.get(currentID)) {
                root.children.push(dfs(child, currentID))
            }
        }
        return root
    }
    return dfs(rootID)
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