function TreeNode(val) {
    this.val = val
    this.left = null
    this.right = null
}

const node = new TreeNode(1) // {val: 1, left: null, right: null}
const node2 = new TreeNode(2) // {val: 2, left: null, right: null}
const node3 = new TreeNode(3) // {val: 3, left: null, right: null}

node.left = node2
node.right = node3

console.log(node) // {val: 1, left: {val: 2, left: null, right: null}, right: {val: 3, left: null, right: null}}



