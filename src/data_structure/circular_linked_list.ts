class NodeCircularLinkedList {
    value: number;
    next: NodeCircularLinkedList | null;

    constructor(inValue: number, inNext: NodeCircularLinkedList | null = null) {
        this.value = inValue;
        this.next = inNext;
    }
}

class CircularLinkedList {
    #head: NodeCircularLinkedList | null;
    #tail: NodeCircularLinkedList | null;
    #_size: number;

    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    pushFront(inValue: number): void {
        if (!this.#head) {
            this.#head = new NodeCircularLinkedList(inValue);
            this.#head.next = this.#head;
            this.#tail = this.#head;
        } else {
            const temp = new NodeCircularLinkedList(inValue, this.#head);
            this.#head = temp;
            if (this.#tail) {
                this.#tail.next = this.#head;
            }
        }

        this.#_size++;
    }

    pushBack(inValue: number): void {
        if (!this.#tail) {
            this.#head = new NodeCircularLinkedList(inValue);
            this.#head.next = this.#head;
            this.#tail = this.#head;
        } else {
            this.#tail.next = new NodeCircularLinkedList(inValue, this.#head);
            this.#tail = this.#tail.next;
        }

        this.#_size++;
    }

    popFront(): number | undefined {
        if (this.#_size <= 0 || this.#head === null) return undefined;

        const returnValue: number = this.#head.value;

        if (this.#_size === 1) {
            this.#head = null;
            this.#tail = null;
        } else {
            this.#head = this.#head.next;
            if (this.#tail && this.#head) {
                this.#tail.next = this.#head;
            }
        }

        this.#_size--;
        return returnValue;
    }

    popBack(): number | undefined {
        if (this.#_size <= 0 || this.#tail === null) return undefined;

        const returnValue: number = this.#tail.value;

        if (this.#_size === 1) {
            this.#head = null;
            this.#tail = null;
        } else {
            let iteratorNode: NodeCircularLinkedList | null = this.#head;

            while (
                iteratorNode !== null &&
                iteratorNode.next !== this.#tail
            ) {
                iteratorNode = iteratorNode.next;
            }

            this.#tail = iteratorNode;

            if (this.#tail && this.#head) {
                this.#tail.next = this.#head;
            }
        }

        this.#_size--;
        return returnValue;
    }
}
