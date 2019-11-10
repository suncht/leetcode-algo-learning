/**
 * 实现链表倒序
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function linkedListReverse(head) {
    if(!head) return head;

    let first = null;
    let a = head;
    let b = a.next;

    // while (b) {
    //     if(!first) {
    //         a.next = first;
    //     }
    //     first = b.next;
    //     b.next = a;
    //     a = b;
    //     b = first;
    //     first = a;
    // }
    while (b) {
        if(!first) {
            a.next = first;
        }
        first = a;
        a = b;
        b = a.next;
        a.next = first;
    }
    return a;
}

function print(head) {
    if(!head) return;

    let h = head;
    do {
        console.log(h.value);
        h = h.next;
    } while (h)
}

let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
print(linkedListReverse(head));


