class NodeQueue{
    value;
    next;

    constructor(inValue, inNext = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class Queue{
    #head;
    #tail;
    #_size;

    constructor()
    {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    push(inValue)
    {
        if(!this.#tail)
        {
            this.#head = new NodeQueue(inValue);
            this.#tail = this.#head;
        }
        else
        {
            this.#tail.next = new NodeQueue(inValue);
            this.#tail = this.#tail.next;
        }
        
        this.#_size++;
    }

    pop()
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
        }


        this.#_size--;
        return returnValue;
    }
}