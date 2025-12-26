class NodeBTree
{
    public value: number;
    public left: NodeBTree | null;
    public right: NodeBTree | null;

    // Constructor
    constructor(inValue: number, inLeft: NodeBTree | null = null, inRight: NodeBTree | null  = null)
    {
        this.value = inValue;
        this.left = inLeft;
        this.right = inRight;
    }
}

class BTree
{
    private root: NodeBTree | null;
    private _size: number;

    // Constructor
    constructor()
    {
        this.root = null;
        this._size = 0;
    }


    // Functions
    public size(): number
    {
        return this._size;
    }
    
    public insert (inValue: number): void
    {
        this.root = this.recursiveInsert(inValue, this.root);
        this._size++;
    }
    
    private recursiveInsert(inValue: number, inPtr: NodeBTree | null): NodeBTree | null
    {
        if (inPtr == null)
            return new NodeBTree(inValue);

        if (inValue < inPtr.value)
            inPtr.left = this.recursiveInsert(inValue, inPtr.left);
        else
            inPtr.right = this.recursiveInsert(inValue, inPtr.right);

        return inPtr;
    }

    public erase (inValue: number): void
    {
        this.root = this.recursiveErase(inValue, this.root);
    }

    private recursiveErase(inValue: number, inPtr: NodeBTree | null): NodeBTree | null
    {
        if (inPtr == null)
            return inPtr;

        if (inValue < inPtr.value)
            inPtr.left = this.recursiveErase(inValue, inPtr.left);
        else if (inValue > inPtr.value)
            inPtr.right = this.recursiveErase(inValue, inPtr.right);
        else // Equal
        {
            if (inPtr.left == null)
            {
                this._size--;
                return inPtr.right;
            }
            if (inPtr.right == null)
            {
                this._size--;
                return inPtr.left;
            }

            // Both childs
            
            let tempPos: NodeBTree | null = inPtr.left;

            // Greatest minor
            while(tempPos.right != null)
                tempPos = tempPos.right;

            inPtr.value = tempPos.value;
            
            inPtr.left = this.recursiveErase(inPtr.value, inPtr.left);
            return inPtr;
        }

        return inPtr;
    }
}