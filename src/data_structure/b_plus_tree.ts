class NodeBPlusTree
{
    public keys: number[];
    public childs: (NodeBPlusTree | null)[];
    public size: number;
    public isLeaf: boolean;
    public next: NodeBPlusTree | null;

    // Constructor
    constructor(inIsLeaf = true)
    {
        this.keys = [];
        this.childs = [];
        this.size = 0;
        this.isLeaf = inIsLeaf;
        this.next = null;
    }
}

class BPlusTree
{
    private root: NodeBPlusTree | null;
    private order: number;
    private _size: number;

    // Constructor
    constructor(inOrder: number)
    {
        this.root = null;
        this._size = 0;
        this.order = inOrder;
    }


    // Functions
    public size(): number
    {
        return this._size;
    }
    

    public insert(inValue: number): void
    {
        this.root = this.recursiveInsert(inValue, this.root, null);
        this._size++;
    }

    private recursiveInsert(inValue: number, inPtr: NodeBPlusTree | null,
                                             inParent: NodeBPlusTree | null): NodeBPlusTree | null
    {
        if (!inPtr) // New leaf
        {
            let tempNode: NodeBPlusTree = new NodeBPlusTree(true);
            tempNode.keys.push(inValue);
            tempNode.size++;
            return tempNode;
        }

        if (inPtr.isLeaf)
        {
            let idx: number = 0

            while(idx < inPtr.size && inValue > inPtr.keys[idx])
                idx++;

            if (idx >= inPtr.size)
                inPtr.keys.push(inValue);
            else
                inPtr.keys.splice(idx, 0, inValue);
            inPtr.size++;
        }
        else
        {
            let found: boolean = false;
            let i: number = 0;
            for (i; i < inPtr.size; i++)
            {
                if (inValue < inPtr.keys[i])
                {
                    found = true;
                    break;
                }
            }

            if (found) // Found
                this.recursiveInsert(inValue, inPtr.childs[i], inPtr);
            else
                this.recursiveInsert(inValue, inPtr.childs[inPtr.size], inPtr); // Last check this
        }
        
        let grow: boolean = false;

        if (inPtr.isLeaf && inPtr.size >= (this.order - 1))
            grow = true;
        else if (!inPtr.isLeaf && inPtr.size > this.order)
            grow = true;


        if (grow)
        {
            // Split
            let mid: number = Math.floor(inPtr.size / 2);

            let newNode = new NodeBPlusTree(false);

            if (inPtr.isLeaf)
            {
                newNode.isLeaf = true;

                let left: number[] = inPtr.keys.slice(0, mid);
                let right: number[] = inPtr.keys.slice(mid);

                inPtr.keys = left;
                inPtr.size = inPtr.keys.length;

                newNode.keys = right;
                newNode.size = newNode.keys.length;

                inPtr.next = newNode;
            }
            else
            {
                let leftChilds: (NodeBPlusTree | null)[] = inPtr.childs.slice(0, mid);
                let rightChilds: (NodeBPlusTree | null)[] = inPtr.childs.slice(mid);

                let leftKeys: number[] = inPtr.keys.slice(0, mid);
                let rightKeys: number[] = inPtr.keys.slice(mid);

                inPtr.childs = leftChilds;
                inPtr.size = inPtr.childs.length;
                inPtr.keys = leftKeys;

                newNode.childs = rightChilds;
                newNode.size = newNode.childs.length;
                newNode.keys = rightKeys;
            }

            // Key
            let front: number = newNode.keys[0];
            
            if (inParent == null) // Root grows
            {
                let newRoot: NodeBPlusTree = new NodeBPlusTree(false);
                newRoot.childs.push(inPtr);
                newRoot.childs.push(newNode);

                newRoot.keys.push(front);

                newRoot.size = 1;
                this.root = newRoot;
            }
            else
            {
                // FIND POS

                let idx: number= 0

                while(idx < inParent.size && front > inParent.keys[idx])
                    idx++;

                if (idx >= inParent.size)
                {
                    inParent.keys.push(front);
                    inParent.childs.push(newNode);
                }
                else
                {
                    inParent.childs.splice(idx, 0, newNode);
                    inParent.keys.splice(idx, 0, front);
                }

                inParent.size++;
            }
        }

        return inPtr;
    }
}