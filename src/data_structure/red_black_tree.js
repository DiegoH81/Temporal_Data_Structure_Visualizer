class NodeRedBlackTree
{
    value;
    left;
    right;
    parent;
    color;

    // Constructor
    constructor(inValue, inColor = "red", inParent = null, inLeft = null, inRight = null)
    {
        this.value = inValue;
        this.left = inLeft;
        this.right = inRight;
        this.parent = inParent;
        this.color = inColor;
    }
}

class RedBlackTree
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
        let parent = null;
        let current = this.#root;

        let node = new NodeRedBlackTree(inValue);

        while(current != null)
        {
            parent = current;

            if (inValue < current.value)
                current = current.left;
            else
                current = current.right;

        }


        if (parent == null)
            this.#root = node;
        else if (inValue < parent.value)
        {
            node.parent = parent;
            parent.left = node;
        }
        else
        {
            node.parent = parent;
            parent.right = node;
        }

        this.#fixInsert(node);
        this.#root.color = "black";
        this.#_size++;
    }
    
    #leftRotate(inPtr)
    {
        let parent = inPtr.parent;

        let top = inPtr;
        let mid = inPtr.right;
        
        mid.parent = top.parent;
        top.parent = mid;

        top.right = mid.left;
        if (mid.left != null)
            mid.left.parent = top;

        mid.left = top;

        if (parent == null)
            this.#root = mid;
        else if (parent.left === top)
            parent.left = mid;
        else
            parent.right = mid;
    }

    #rightRotate(inPtr)
    {
        let parent = inPtr.parent;

        let top = inPtr;
        let mid = inPtr.left;
        
        mid.parent = top.parent;
        top.parent = mid;

        top.left = mid.right;
        if (mid.right != null)
            mid.right.parent = top;

        mid.right = top;

        if (parent == null)
            this.#root = mid;
        else if (parent.left === top)
            parent.left = mid;
        else
            parent.right = mid;
    }

    #getUncle(inGrandpa, inParent)
    {
        let uncle = inGrandpa.left;

        if (uncle === inParent)
            uncle = inGrandpa.right;

        return uncle;
    }

    #fixInsert(inNode)
    {
        while (inNode != this.#root && inNode.parent.color == "red")
        {
            let parent = inNode.parent;
            let grandpa = parent.parent;
            let uncle = this.#getUncle(grandpa, parent);

            if (uncle != null && uncle.color == "red")
            {
                uncle.color = parent.color = "black";
                grandpa.color = "red";
            }
            else
            {
                if (grandpa.left == parent) 
                {
                    if (inNode == parent.right) // LR
                    {
                        this.#leftRotate(parent);
                        inNode = parent;
                        parent = inNode.parent;
                        grandpa = parent.parent;
                    }
                    parent.color = "black";
                    grandpa.color = "red";

                    this.#rightRotate(grandpa);
                }
                else
                {
                    if (inNode == parent.left) // RL
                    {
                        this.#rightRotate(parent);
                        inNode = parent;
                        parent = inNode.parent;
                        grandpa = parent.parent;
                    }
                    parent.color = "black";
                    grandpa.color = "red";

                    this.#leftRotate(grandpa);
                }

                break;
            }

            inNode = grandpa;
        }
    }

}