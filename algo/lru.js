class Node {
    constructor (key, data) {
        this.data = data
        this.key = key
        this.next = null
        this.prev = null
    }
}

/**
 * 手动实现LRU
 * 获取元素的时间复杂度O(1)
 */
class Lru {
    constructor (capacity = 10) {
        this.head = null
        this.tail = null
        this.map = new Map()
        this.size = 0
        this.capacity = capacity
    }

    getData (key) {
        let node = this.map.get(key)
        if (!node) {
            return null
        }

        this._putNodeToFirst(node)
        return node
    }

    putData (key, data) {
        let node = new Node(key, data)
        if(!this.head) {
            this.head = node
            this.tail = node

            this.size++
            this.map.set(key, node)
        } else if(this.size < this.capacity) {
            node.next = this.head
            this.head.prev = node
            this.head = node

            this.size++
            this.map.set(key, node)
        } else {
            this._removeNodeFromTail()
        }
    }

    _putNodeToFirst (node) {
        let temp = node

        if (temp === this.head) {

        } else if (temp === this.tail) {
            let newTail = temp.prev
            temp.prev.next = null
            temp.prev = null
            this.tail = newTail

            temp.next = this.head
            this.head.prev = temp
            this.head = temp
        } else {
            temp.next.prev = temp.prev
            temp.prev.next = temp.next
            temp.next = null
            temp.prev = null

            temp.next = this.head
            this.head.prev = temp
            this.head = temp
        }
    }


    _removeNodeFromTail () {
        let newTail = this.tail.prev
        this.tail.prev.next = null
        this.tail.prev = null
        this.tail = newTail

        this.map.delete(newTail.key)
    }

}

function print(head) {
    if(!head) return;

    let h = head;
    do {
        console.log(h.key);
        h = h.next;
    } while (h)
}

let lru = new Lru()

// for (let i = 0; i < 12; i++) {
//     lru.putData(i, i)
// }
lru.putData(2, 2)
lru.putData(3, 3)
lru.getData(3)

print(lru.head)
