/** * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let per = 0;
    let begin = undefined;
    let current = undefined;
    do {
        let a = 0;
        if (l1 != null) {
            a = l1.val;
            l1 = l1.next;
        }

        let b = 0;
        if (l2 != null) {
            b = l2.val;
            l2 = l2.next;
        }

        let res = a + b + per;
        per = res >= 10 ? 1 : 0;
        res = res % 10;

        const n = {
            val: res,
            next: null,
        };

        if (begin === undefined) {
            begin = n;
        }

        if (current !== undefined) {
            current.next = n;
        }
        current = n;

    } while (l1 != null || l2 != null || per > 0 )

    return begin;
};