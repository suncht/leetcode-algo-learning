function print(head) {
    if(!head) return;

    let h = head;
    do {
        console.log(h.value);
        h = h.next;
    } while (h)
}

function print2(head, tail) {
    if(!head) return;
    if(head === tail) {
        console.log(head.value);
        return;
    }

    let h = head;
    do {
        console.log(h.value);
        h = h.next;
    } while (h && h!==tail)
}

function print3(head, keyName) {
    if(!head) return;

    let h = head;
    do {
        console.log(h[keyName]);
        h = h.next;
    } while (h)
}

module.exports = {
    print,
    print2,
    print3
}
