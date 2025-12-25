class NodeStack
{
    value;
    next;

    constructor(inValue, inNext = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class Stack
{
    #head;
    #_size;

    // Constructor
    constructor()
    {
        this.#head = null;
        this.#_size = 0;
    }
    
    // Functions
    size()
    {
        return this.#_size;
    }

    push(inValue)
    {
        this.#head = new NodeStack(inValue, this.#head);
        this.#_size++;
    }

    pop()
    {
        if (this.#head != null)
        {
            this.#head = this.#head.next;
            this.#_size--;
        }
    }

    // Getter
    top()
    {
        if (this.#head != null)
            return this.#head.value;

        return undefined;
    }
}