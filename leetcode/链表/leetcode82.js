function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var deleteDuplicates = function(head) {
    if (!head) {
        return head
    }
    let hair = new ListNode(0, head)
    let cur = hair
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val){
            let temp = cur.next.val
            while (cur.next && cur.next.val === temp) {
                cur.next = cur.next.next
            }
        } else {
            cur = cur.next 
        }
    }   
    return hair.next
};