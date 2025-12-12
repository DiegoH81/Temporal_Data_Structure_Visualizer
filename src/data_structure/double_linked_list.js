class NodeDoubleLinkedList
{
    value;
    next;
    prev;

    // Constructor
    constructor(inValue, inNext = null, inPrev = null)
    {
        this.value = inValue;
        this.next = inNext;
        this.prev = inPrev;
    }
}

class DoubleLinkedList
{
    #head;
    #tail;
    #_size;

    // Constructor
    constructor()
    {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }


    // Functions
    size()
    {
        return this.#_size;
    }
    
    pushBack(inValue)
    {
        let node = new NodeDoubleLinkedList(inValue);
        if (this.#_size == 0)
        {
            this.#head = this.#tail = node;
        }
        else
        {
            this.#tail.next = node;
            node.prev = this.#tail;
            this.#tail = node;
        }

        this.#_size++;
    }

    pushFront(inValue)
    {
        let node = new NodeDoubleLinkedList(inValue);
        if (this.#_size == 0)
        {
            this.#head = this.#tail = node;
        }
        else
        {
            this.#head.prev = node;
            node.next = this.#head;
            this.#head = node;
        }

        this.#_size++;
    }

    popFront()
    {
        if (this.#_size <= 0)
            return undefined;

        let val = this.#head.value;
    
        if (this.#head == this.#tail)
        {
            this.#head = this.#tail = null;
        }
        else
        {
            this.#head = this.#head.next;
            this.#head.prev = null;
        }

        this.#_size--;

        return val;
    }

    popBack()
    {
        if (this.#_size <= 0)
            return undefined;

        let val = this.#tail.value;

        if (this.#head == this.#tail)
        {
            this.#head = this.#tail = null;
        }
        else
        {
            this.#tail = this.#tail.prev;
            this.#tail.next = null;
        }

        this.#_size--;

        return val;
    }

    // Getters
    front()
    {
        if (this.#_size <= 0)
            return undefined;

        return this.#head.value;
    }

    back()
    {
        if (this.#_size <= 0)
            return undefined;

        return this.#tail.value;
    }
}
