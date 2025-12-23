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

    erase(inValue)
    {
        let node = this.#find(inValue, this.#root);
        if (node == null)
            return;

        
        let originalColor = node.color;

        if (node.left == null)
            this.#transplant(node, node.right);
        else if (node.right == null)
            this.#transplant(node, node.left);
        else // Both childs
        {
            let maximumNode = this.#maximum(node);
            let yOriginalColor = maximumNode.color;

            let x = maximumNode.left;
            
            if (maximumNode.parent != node)
            {
                this.#transplant(maximumNode, maximumNode.left);

                maximumNode.left = node.left;
                maximumNode.left.parent = maximumNode;
            }

            this.#transplant(node, maximumNode);
            maximumNode.right = node.right;
            maximumNode.right.parent = maximumNode;
            maximumNode.color = node.color;

            if (yOriginalColor == "black")
                this.#deleteFixup(node);
        }
    }


    #find(inValue, inPtr)
    {
        let node = this.#root;
        while(node != null && node.value != inValue)
        {
            if(inValue < node.value)
                node = node.left;
            else
                node = node.right;
        }

        return node;
    }

    #transplant(inU, inV)
    {
        if (inU.parent == null)
            this.#root = inV;
        else if (inU == inU.parent.left)
            inU.parent.left = inV;
        else
            inU.parent.right = inV;

        if (inV != null)
            inV.parent = inU.parent;
    }

    #maximum(inNode)
    {
        let toReturn = inNode.left;

        while(toReturn != null && toReturn.right != null)
            toReturn = toReturn.right;

        return toReturn;
    }

    #deleteFixup(x)
    {
        while(x != this.#root && x.color == "black")
        {
            if (x == x.parent.left)
            {
                // Case 1
                let w = x.parent.right;
                if (w.color == "red")
                {
                    w.color = "black";
                    x.parent.color = "red";
                    this.#leftRotate(x.parent);
                    w = x.parent.right;
                }

                // Case 2
                if ((w.left == null || w.left.color == "black") &&
                    (w.right == null || w.right.color == "black"))
                {
                    w.color = "red";
                    x = x.parent;
                }
                else
                {
                    // Case 3
                    if (w.right == null || w.right.color == "black")
                    {
                        if (w.left != null)
                            w.left.color = "black";

                        w.color = "red";
                        this.#rightRotate(w);
                        w = x.parent.right;
                    }

                    // Case 4
                    w.color = x.parent.color;
                    x.parent.color = "black";
                    if (w.right != null)
                        w.right.color = "black";

                    this.#leftRotate(x.parent);
                    x = this.#root;
                }
            }
            else
            {
                // Case 1
                let w = x.parent.left;
                if (w.color == "red")
                {
                    w.color = "black";
                    x.parent.color = "red";
                    this.#rightRotate(x.parent);
                    w = x.parent.left;
                }

                // Case 2
                if ((w.left == null || w.left.color == "black") &&
                    (w.right == null || w.right.color == "black"))
                {
                    w.color = "red";
                    x = x.parent;
                }
                else
                {
                    // Case 3
                    if (w.left == null || w.left.color == "black")
                    {
                        if (w.right != null)
                            w.right.color = "black";

                        w.color = "red";
                        this.#leftRotate(w);
                        w = x.parent.left;
                    }

                    // Case 4
                    w.color = x.parent.color;
                    x.parent.color = "black";
                    if (w.left != null)
                        w.left.color = "black";

                    this.#rightRotate(x.parent);
                    x = this.#root;
                }
            }                
        }

        x.color = "black";
    }
}