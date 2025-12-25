class NodeDoublyCircularLinkedList{
    value;
    next;
    prev;

    constructor(inValue, inNext = null, inPrev = null)
    {
        this.value = inValue;
        this.next = inNext;
        this.prev = inPrev;
    }
}

class DoublyCircularLinkedList{
    #head;
    #tail;
    #_size;

    constructor()
    {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    pushFront(inValue)
    {
        if(!this.#head)
        {
            this.#head = new NodeDoublyCircularLinkedList(inValue);
            this.#head.next = this.#head;
            this.#head.prev = this.#head;
            this.#tail = this.#head;
        }
        else
        {
            let temp = new NodeDoublyCircularLinkedList(inValue, this.#head, this.#tail);
            this.#head.prev = temp;
            this.#tail.next = temp;
            this.#head = temp;

        }

        this.#_size++;
    }

    pushBack(inValue)
    {
        if(!this.#tail)
        {
            this.#head = new NodeDoublyCircularLinkedList(inValue);
            this.#head.next = this.#head;
            this.#head.prev = this.#head;
            this.#tail = this.#head;
        }
        else
        {
            this.#tail.next = new NodeDoublyCircularLinkedList(inValue, this.#head, this.#tail);
            this.#tail = this.#tail.next;
            this.#head.prev = this.#tail;
        }
        
        this.#_size++;
    }

    popFront()
    {
        if(this.#_size <= 0) return undefined;

        let returnValue = this.#head.value;
        if(this.#_size == 1)
        {
            this.#head = null;
            this.#tail = null;
        }
        else
        {
            this.#head = this.#head.next;
            this.#head.prev = this.#tail;
            this.#tail.next = this.#head;
        }


        this.#_size--;
        return returnValue;
    }

    popBack()
    {
        if(this.#_size <= 0) return undefined;
        let returnValue = this.#tail.value;

        if(this.#_size == 1)
        {
            this.#head = null;
            this.#tail = null;
        }
        else
        {
            this.#tail = this.#tail.prev;
            this.#tail.next = this.#head;
            this.#head.prev = this.#tail; 
        }


        this.#_size--;
        return returnValue;
    }
}