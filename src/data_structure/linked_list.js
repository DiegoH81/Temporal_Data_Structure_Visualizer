class NodeLinkedList{
    value;
    next;

    constructor(inValue, inNext = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class LinkedList{
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
            this.#head = new NodeLinkedList(inValue);
        }
        else
        {
            let temp = new NodeLinkedList(inValue, this.#head);
            this.#head = temp;
        }

        this.#_size++;
    }

    pushBack(inValue)
    {
        if(!this.#tail)
        {
            this.#tail = new NodeLinkedList(inValue);
        }
        else
        {
            this.#tail.next = new NodeLinkedList(inValue);
            this.#tail = this.#tail.next;
        }
        
        this.#_size++;
    }

    popFront()
    {
        if(_size <= 0) return undefined;

        let returnValue = this.#head.value;
        let temp = this.#head.next;
        this.#head = null;
        this.#head = temp;

        this.#_size--;
        return returnValue;
    }

    popBack()
    {
        if(_size <= 0) return undefined;
        let returnValue = this.#tail.value;

        let iteratorNode = this.#head;
        while(iteratorNode.next != this.#tail){
            iteratorNode = iteratorNode.next;
        }
        this.#tail = null;
        this.#tail = iteratorNode;

        this.#_size--;
        return returnValue;
    }
}