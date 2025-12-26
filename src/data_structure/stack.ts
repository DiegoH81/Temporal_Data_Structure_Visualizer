class NodeStack
{
    value: number;
    next: NodeStack | null;

    public constructor(inValue: number, inNext: NodeStack | null = null)
    {
        this.value = inValue;
        this.next = inNext;
    }
}

class Stack
{
    private head: NodeStack | null;
    private _size: number;

    // Constructor
    public constructor()
    {
        this.head = null;
        this._size = 0;
    }
    
    // Functions
    public size()
    {
        return this._size;
    }

    public push(inValue: number)
    {
        this.head = new NodeStack(inValue, this.head);
        this._size++;
    }

    public pop()
    {
        if (this.head != null)
        {
            this.head = this.head.next;
            this._size--;
        }
    }

    // Getter
    public top()
    {
        if (this.head != null)
            return this.head.value;

        return undefined;
    }
}