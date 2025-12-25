class NodeAVL
{
    value;
    childs;
    height;

    constructor(inValue,inLeft = null,inRight = null,inHeight = 1)
    {
        this.value = inValue;
        this.childs = [inLeft, inRight];
        this.height = inHeight;
    }
}

class AVL
{
    #root;

    height(inNode)
    {
        if(inNode == null)
        {
            return 0;
        }
        return inNode.height;
    }

    balanceFactor(inNode)
    {
        if(inNode == null)
        {
            return 0;
        }
        return this.height(inNode.childs[0]) - this.height(inNode.childs[1]);
    }

    rightRotate(inNode)
    {
        let x = inNode.childs[0];
        let T2 = x.childs[1];

        x.childs[1] = inNode;
        inNode.childs[0] = T2;

        inNode.height = Math.max(this.height(inNode.childs[0]),this.height(inNode.childs[1]))+1;
        x.height = Math.max(this.height(x.childs[0]),this.height(x.childs[1]))+1;
        
        return x;
    }

    leftRotate(inNode)
    {
        let y = inNode.childs[1];
        let T2 = y.childs[0];

        y.childs[0] = inNode;
        inNode.childs[1] = T2;

        y.height = Math.max(this.height(y.childs[0]),this.height(y.childs[1]))+1;
        inNode.height = Math.max(this.height(inNode.childs[0]),this.height(inNode.childs[1]))+1;
        
        return y;
    }

    insert(inKey)
    {
        this.#root = this.#insert(this.#root,inKey);
    }

    #insert(inNode,inKey)
    {
        if(inNode == null)
        {
            return new NodeAVL(inKey);
        }

        if(inKey < inNode.value)
        {
            inNode.childs[0] = this.#insert(inNode.childs[0],inKey);
        }
        else if(inKey > inNode.value)
        {
            inNode.childs[1] = this.#insert(inNode.childs[1],inKey);
        }
        else
        {
            return inNode;
        }

        inNode.height = 1 + Math.max(this.height(inNode.childs[0]),this.height(inNode.childs[1]));

        let balance = this.balanceFactor(inNode);
        
        //LL
        if(balance > 1 && inKey < inNode.childs[0].value)
        {
            return this.rightRotate(inNode);
        }

        //RR
        if(balance < -1 && inKey > inNode.childs[1].value)
        {
            return this.leftRotate(inNode);
        }

        // LR
        if(balance > 1 && inKey > inNode.childs[0].value)
        {
            inNode.childs[0] = this.leftRotate(inNode.childs[0]);
            return this.rightRotate(inNode);
        }

        // RL
        if(balance < -1 && inKey < inNode.childs[1].value)
        {
            inNode.childs[1] = this.rightRotate(inNode.childs[1]);
            return this.leftRotate(inNode);
        }

        return inNode;
    }

    minValueNode(inNode)
    {
        let current = inNode;
        while (current.childs[0] != null)
        {
            current = current.childs[0];
        }
        return current;
    }

    delete(inKey)
    {
        this.#root = this.#delete(this.#root,inKey);
    }

    #delete(inNode, inKey)
    {
        if (inNode == null)
        {
            return inNode;
        }

        if (inKey < inNode.value)
        {
            inNode.childs[0] = this.#delete(inNode.childs[0], inKey);
        }
        else if (inKey > inNode.value)
        {
            inNode.childs[1] = this.#delete(inNode.childs[1], inKey);
        }
        else
        {
            if (inNode.childs[0] == null || inNode.childs[1] == null)
            {
                let temp = inNode.childs[0] != null
                    ? inNode.childs[0]
                    : inNode.childs[1];

                if (temp == null)
                {
                    inNode = null;
                }
                else
                {
                    inNode = temp;
                }
            }
            else
            {
                let temp = this.minValueNode(inNode.childs[1]);
                inNode.value = temp.value;
                inNode.childs[1] = this.#delete(inNode.childs[1], temp.value);
            }
        }

        if (inNode == null)
        {
            return inNode;
        }

        inNode.height = 1 + Math.max(this.height(inNode.childs[0]),this.height(inNode.childs[1]));

        let balance = this.balanceFactor(inNode);

        // LL
        if (balance > 1 && this.balanceFactor(inNode.childs[0]) >= 0)
        {
            return this.rightRotate(inNode);
        }

        // RR
        if (balance < -1 && this.balanceFactor(inNode.childs[1]) <= 0)
        {
            return this.leftRotate(inNode);
        }
    
        // LR
        if (balance > 1 && this.balanceFactor(inNode.childs[0]) < 0)
        {
            inNode.childs[0] = this.leftRotate(inNode.childs[0]);
            return this.rightRotate(inNode);
        }

        // RL
        if (balance < -1 && this.balanceFactor(inNode.childs[1]) > 0)
        {
            inNode.childs[1] = this.rightRotate(inNode.childs[1]);
            return this.leftRotate(inNode);
        }

        return inNode;
    }


}