class ListNode {
    constructor(val, next) {
        this.val = (val===undefined ? 0 : val);
        this.next = (next===undefined ? null : next);
    }
}

let head = {
    val: 1,
    next: {
        val: 1,
        next: {
            val: 2,
            next: {
                val: 3,
                next: {
                    val: 3,
                    next: null
                }
            }
        }
    }
}

var deleteDuplicates = function(head) {
    let cur = head;
    while (cur && cur.next) {
        if (cur.val === cur.next.val) { // 当前的值等于下一个值
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
};

console.log(deleteDuplicates(head))
