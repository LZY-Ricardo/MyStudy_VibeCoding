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

var levelOrder = function(root) {
    let res = []
    let queue = []
    if (root) queue.push(root)
    while (queue.length) {
        let len = queue.length
        let temp = []
        while (len) {
            let node = queue.shift()
            temp.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
            len--
        }
        res.push(temp)
    }
    return res
}