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
    public size() : number
    {
        return this._size;
    }

    public push(inValue: number): void
    {
        this.head = new NodeStack(inValue, this.head);
        this._size++;
    }

    public pop(): void
    {
        if (this.head)
        {
            this.head = this.head.next;
            this._size--;
        }
    }

    // Getter
    public top(): number | undefined
    {
        if (this.head != null)
            return this.head.value;

        return undefined;
    }
}