class NodeBPlusTree
{
    keys;
    childs;
    size;
    isLeaf;
    next;

    // Constructor
    constructor(inOrder, inIsLeaf = true)
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
    #root;
    #order;
    #_size;

    // Constructor
    constructor(inOrder)
    {
        this.#root = null;
        this.#_size = 0;
        this.#order = inOrder;
    }


    // Functions
    size()
    {
        return this.#_size;
    }
    

    insert(inValue)
    {
        this.#root = this.#insert(inValue, this.#root, null);
        this.#_size++;
    }

    #insert(inValue, inPtr, inParent)
    {
        if (!inPtr)
        {
            let tempNode = new NodeBPlusTree(this.#order, leaf);
            tempNode.keys.push(inValue);
            tempNode.size++;
            return tempNode;
        }

        if (inPtr.isLeaf)
        {
            let idx = 0

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
            let found = false;
            let i = 0;
            for (i; i < inPtr.size; i++)
            {
                if (inValue < inPtr.keys[i])
                {
                    found = true;
                    break;
                }
            }

            if (found) // Found
                this.#insert(inValue, inPtr.childs[i], inPtr);
            else
                this.#insert(inValue, inPtr.childs[inPtr.size], inPtr); // Last check this
        }
        
        let grow = false;

        if (inPtr.isLeaf && inPtr.size >= (this.#order - 1))
            grow = true;
        else if (!inPtr.isLeaf && inPtr.size > this.#order)
            grow = true;


        if (grow)
        {
            // Split
            let mid = Math.floor(inPtr.size / 2);

            let newNode = new NodeBPlusTree(this.#order);

            if (inPtr.isLeaf)
            {
                
                let left = inPtr.keys.slice(0, mid);
                let right = inPtr.keys.slice(mid);

                inPtr.keys = left;
                inPtr.size = inPtr.keys.length;

                newNode.keys = right;
                newNode.size = newNode.keys.length;

                inPtr.next = newNode;
            }
            else
            {
                let leftChilds = inPtr.childs.slice(0, mid);
                let rightChilds = inPtr.childs.slice(mid);

                let leftKeys = inPtr.keys.slice(0, mid);
                let rightKeys = inPtr.keys.slice(mid);

                inPtr.childs = leftChilds;
                inPtr.size = inPtr.childs.length;
                inPtr.keys = leftKeys;

                newNode.childs = rightChilds;
                newNode.size = newNode.childs.length;
                newNode.keys = rightKeys;
            }

            // Key
            let front = newNode.keys[0];
            
            if (inParent == null) // Root grows
            {
                let newRoot = new NodeBPlusTree(this.#order);
                newRoot.childs.push(inPtr);
                newRoot.childs.push(newNode);

                newRoot.keys.push(front);

                newRoot.size = 1;
                this.#root = newRoot;
            }
            else
            {
                // FIND POS

                let idx = 0

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