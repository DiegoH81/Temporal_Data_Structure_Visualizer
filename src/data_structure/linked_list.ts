class NodeLinkedList{
    value: number;
    next: NodeLinkedList | null;

    constructor(inValue: number, inNext: NodeLinkedList | null = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class LinkedList{
    #head: NodeLinkedList | null;
    #tail: NodeLinkedList | null;
    #_size: number;

    constructor()
    {
        this.#head = null;
        this.#tail = null;
        this.#_size = 0;
    }

    pushFront(inValue: number): void
    {
        if(!this.#head)
        {
            this.#head = new NodeLinkedList(inValue);
            this.#tail = this.#head;
        }
        else
        {
            let temp = new NodeLinkedList(inValue, this.#head);
            this.#head = temp;
        }

        this.#_size++;
    }

    pushBack(inValue: number): void
    {
        if(!this.#tail)
        {
            this.#head = new NodeLinkedList(inValue);
            this.#tail = this.#head;            
        }
        else
        {
            this.#tail.next = new NodeLinkedList(inValue);
            this.#tail = this.#tail.next;
        }
        
        this.#_size++;
    }

    popFront(): number | undefined
    {
        if(this.#_size <= 0 || this.#head == null) return undefined;

        let returnValue: number = this.#head.value;

        if(this.#_size == 1){
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

    popBack(): number | undefined
    {
        if(this.#_size <= 0 || this.#tail == null) return undefined;
        let returnValue = this.#tail.value;

        if(this.#_size == 1){
            this.#head = null;
            this.#tail = null;
        }
        else
        {
            let iteratorNode: NodeLinkedList | null = this.#head;
            while(iteratorNode != null && iteratorNode.next != this.#tail){
                iteratorNode = iteratorNode.next;
            }
            this.#tail = iteratorNode;

            if (this.#tail !== null) {
                this.#tail.next = null;
            }
        }


        this.#_size--;
        return returnValue;
    }
}