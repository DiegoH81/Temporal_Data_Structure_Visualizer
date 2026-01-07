export class NodeQueue<T>
{
    value: T;
    next: NodeQueue<T> | null;

    constructor(inValue : T, inNext : NodeQueue<T> | null = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

export class QueueAUX<T>
{
    #head: NodeQueue<T> | null;
    #tail: NodeQueue<T> | null;
    #_size: number;

    constructor()
    {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    push(inValue: T) : void
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

    pop() : T | undefined
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