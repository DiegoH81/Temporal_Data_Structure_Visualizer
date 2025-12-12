class NodeCircularLinkedList{
    value;
    next;

    constructor(inValue, inNext = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class CircularLinkedList{
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
            this.#head = new NodeCircularLinkedList(inValue);
            this.#head.next = this.#head; 
            this.#tail = this.#head;
        }
        else
        {
            let temp = new NodeCircularLinkedList(inValue, this.#head);
            this.#head = temp;
            this.#tail.next = this.#head;
        }

        this.#_size++;
    }

    pushBack(inValue)
    {
        if(!this.#tail)
        {
            this.#head = new NodeCircularLinkedList(inValue);
            this.#head.next = this.#head; 
            this.#tail = this.#head;
        }
        else
        {
            this.#tail.next = new NodeCircularLinkedList(inValue, this.#head);
            this.#tail = this.#tail.next;
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
            let iteratorNode = this.#head;
            while(iteratorNode.next != this.#tail){
                iteratorNode = iteratorNode.next;
            }
            this.#tail = iteratorNode;
            this.#tail.next = this.#head;
        }


        this.#_size--;
        return returnValue;
    }
}