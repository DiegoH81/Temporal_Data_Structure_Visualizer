class NodeDoubleLinkedList
{
    public value: number;
    public next: NodeDoubleLinkedList | null;
    public prev: NodeDoubleLinkedList | null;

    // Constructor
    public constructor(inValue: number, inNext: NodeDoubleLinkedList | null = null,
                                        inPrev: NodeDoubleLinkedList | null = null)
    {
        this.value = inValue;
        this.next = inNext;
        this.prev = inPrev;
    }
}

class DoubleLinkedList
{
    private head: NodeDoubleLinkedList | null;
    private tail: NodeDoubleLinkedList | null;
    private _size: number;

    // Constructor
    public constructor()
    {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }


    // Functions
    public size(): number
    {
        return this._size;
    }
    
    public pushBack(inValue: number): void
    {
        let node: NodeDoubleLinkedList = new NodeDoubleLinkedList(inValue);
        if (this._size == 0)
            this.head = this.tail = node;
        else
        {
            this.tail!.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this._size++;
    }

    public pushFront(inValue: number): void
    {
        let node: NodeDoubleLinkedList = new NodeDoubleLinkedList(inValue);
        if (this._size == 0)
            this.head = this.tail = node;
        else
        {
            this.head!.prev = node;
            node.next = this.head;
            this.head = node;
        }

        this._size++;
    }

    public popFront(): number | undefined
    {
        if (this._size <= 0)
            return undefined;


        let val: number = this.head!.value;
    
        if (this.head == this.tail)
            this.head = this.tail = null;
        else
        {
            this.head = this.head!.next;
            this.head!.prev = null;
        }

        this._size--;

        return val;
    }

    public popBack(): number | undefined
    {
        if (this._size <= 0)
            return undefined;

        let val: number = this.tail!.value;

        if (this.head == this.tail)
            this.head = this.tail = null;
        else
        {
            this.tail = this.tail!.prev;
            this.tail!.next = null;
        }

        this._size--;

        return val;
    }

    // Getters
    public front(): number | undefined
    {
        if (this._size <= 0)
            return undefined;

        return this.head!.value;
    }

    public back(): number | undefined
    {
        if (this._size <= 0)
            return undefined;

        return this.tail!.value;
    }
}
