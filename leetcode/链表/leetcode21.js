// let arr1 = [1, 4, 7]; let arr2 = [2, 3, 6, 8, 9]

class ListNode {
    constructor(val, next) {
      this.val = (val===undefined ? 0 : val);
      this.next = (next===undefined ? null : next);
    }
  }

let l1 = {
    val: 1,
    next: {
        val: 4,
        next: {
            val: 7,
            next: null
        }
    }
}, 
l2 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 4,
            next: null
        }
    }
}
// 输出: [1, 1, 2, 3, 4, 4]
var mergeTwoLists = function(list1, list2) {
    let head = new ListNode()
    let list = head

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            list.next = list1
            list1 = list1.next
        } else {
            list.next = list2
            list2 = list2.next
        }
        list = list.next
    }
    // 当某一个链表已经穿完了,
    if (list1 !== null) {
        list.next = list1
    } else {
        list.next = list2
    }
    return head.next
};

console.log(mergeTwoLists(l1, l2))