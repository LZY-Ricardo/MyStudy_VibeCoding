const root = {
    val: 'A',
    left: {
        val: 'B',
        left: {
            val: 'D'
        },
        right: {
            val: 'E'
        }
    },
    right: {
        val: 'C',
        left: {
            val: 'F'
        },
        right: {
            val: 'G'
        }
    }
}

function preOrder(root) {
    if (!root) return;
    console.log(root.val);
    preOrder(root.left);
    preOrder(root.right);
}
console.log(preOrder(root));

function inOrder(root) {
    if (!root) return;
    inOrder(root.left);
    console.log(root.val);
    inOrder(root.right);
}
console.log(inOrder(root));

function postOrder(root) {
    if (!root) return;
    postOrder(root.left);
    postOrder(root.right);
    console.log(root.val);
}
console.log(postOrder(root));
