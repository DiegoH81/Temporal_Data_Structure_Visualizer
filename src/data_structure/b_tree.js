class NodeBTree
{
    value;
    left;
    right;

    // Constructor
    constructor(inValue, inLeft = null, inRight = null)
    {
        this.value = inValue;
        this.left = inLeft;
        this.right = inRight;
    }
}

class BTree
{
    #root;
    #_size;

    // Constructor
    constructor()
    {
        this.#root = null;
        this.#_size = 0;
    }


    // Functions
    size()
    {
        return this.#_size;
    }
    
    insert (inValue)
    {
        this.#root = this.#insert(inValue, this.#root);
        this.#_size++;
    }
    
    #insert(inValue, inPtr)
    {
        if (inPtr == null)
            return new NodeBTree(inValue);

        if (inValue < inPtr.value)
            inPtr.left = this.#insert(inValue, inPtr.left);
        else
            inPtr.right = this.#insert(inValue, inPtr.right);

        return inPtr;
    }

    erase (inValue)
    {
        this.#root = this.#erase(inValue, this.#root);
    }

    #erase(inValue, inPtr)
    {
        if (inPtr == null)
            return inPtr;

        if (inValue < inPtr.value)
            inPtr.left = this.#erase(inValue, inPtr.left);
        else if (inValue > inPtr.value)
            inPtr.right = this.#erase(inValue, inPtr.right);
        else // Equal
        {
            if (inPtr.left == null)
            {
                this.#_size--;
                return inPtr.right;
            }
            if (inPtr.right == null)
            {
                this.#_size--;
                return inPtr.left;
            }

            // Both childs
            
            let tempPos = inPtr.left;

            // Greatest minor
            while(tempPos.right != null)
                tempPos = tempPos.right;

            inPtr.value = tempPos.value;
            
            inPtr.left = this.#erase(inPtr.value, inPtr.left);
            return inPtr;
        }

        return inPtr;
    }
  
    // Getters
    
}