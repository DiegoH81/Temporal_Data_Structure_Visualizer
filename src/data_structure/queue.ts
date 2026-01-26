class NodeQueue{
    value: number;
    next: NodeQueue | null;

    constructor(inValue : number, inNext : NodeQueue | null = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class Queue{
    #head: NodeQueue | null;
    #tail: NodeQueue | null;
    #_size: number;

    constructor()
    {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    push(inValue: number) : void
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

    pop() : number | undefined
    {
        if(this.#_size <= 0 || this.#head == null) return undefined;

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