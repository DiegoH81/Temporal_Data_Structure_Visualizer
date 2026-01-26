class NodeDoublyCircularLinkedList {
    value: number;
    next: NodeDoublyCircularLinkedList | null;
    prev: NodeDoublyCircularLinkedList | null;

    constructor(inValue: number, inNext: NodeDoublyCircularLinkedList | null = null, inPrev: NodeDoublyCircularLinkedList | null = null) {
        this.value = inValue;
        this.next = inNext;
        this.prev = inPrev;
    }
}

class DoublyCircularLinkedList {
    #head: NodeDoublyCircularLinkedList | null;
    #tail: NodeDoublyCircularLinkedList | null;
    #_size: number;

    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    pushFront(inValue: number): void {
        if (!this.#head) {
            this.#head = new NodeDoublyCircularLinkedList(inValue);
            this.#head.next = this.#head;
            this.#head.prev = this.#head;
            this.#tail = this.#head;
        } else {
            const temp = new NodeDoublyCircularLinkedList(inValue, this.#head, this.#tail);
            this.#head.prev = temp;
            if (this.#tail) this.#tail.next = temp;
            this.#head = temp;
        }

        this.#_size++;
    }

    pushBack(inValue: number): void {
        if (!this.#tail) {
            this.#head = new NodeDoublyCircularLinkedList(inValue);
            this.#head.next = this.#head;
            this.#head.prev = this.#head;
            this.#tail = this.#head;
        } else {
            this.#tail.next = new NodeDoublyCircularLinkedList(inValue, this.#head, this.#tail);
            this.#tail = this.#tail.next;
            if (this.#head) this.#head.prev = this.#tail;
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
            if (this.#head && this.#tail) {
                this.#head.prev = this.#tail;
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
            this.#tail = this.#tail.prev;
            if (this.#tail && this.#head) {
                this.#tail.next = this.#head;
                this.#head.prev = this.#tail;
            }
        }

        this.#_size--;
        return returnValue;
    }
}
