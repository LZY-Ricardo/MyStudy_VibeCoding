const arr = [
    { id: 1 },
    { id: 2, parentId: 1 },
    { id: 3, parentId: 1 },
    { id: 4, parentId: 2 },
    { id: 5, parentId: 3 },
    { id: 6, parentId: 3 },
];

function createTree(arr) {
    const map = {};
    const result = {};

    // 1. 初始化节点
    arr.forEach(item => {
        map[item.id] = { id: item.id };
    });
    // console.log(map)
    // 2. 挂载节点到父节点的children
    arr.forEach(item => {
        const parent = map[item.parentId];
        // console.log(parent)
        if (parent) {
            // 父节点没有children则创建
            if (!parent.children) parent.children = [];
            parent.children.push(map[item.id]);
        } else {
            // 没有父节点，说明是根节点
            result[item.id] = map[item.id];
        }
    });

    return result;
}

const tree = createTree(arr);
console.log('树形结构:', JSON.stringify(tree, null, 2));