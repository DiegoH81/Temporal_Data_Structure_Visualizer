import { type DrawNode } from "../utils/draw_node";
import { type NodeItem } from "../utils/nodeItem";
import { QueueAUX } from "../utils/queueAUX";

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

    // Travel
    public travel() :DrawNode[]
    {
        let data: DrawNode[] = []

        let currentId: number = 0;
        let queue = new QueueAUX<NodeItem<NodeBTree>>();
        
        if (!this.root)
            return data;
        
        queue.push({node: this.root,
                    level: 0,
                    parentId : null
                    });
        
        
        while (true)
        {
            let top = queue.pop();
            let nodeId: number = currentId;
            if (!top)
                break;
            
            data.push({id: nodeId,
                      value: top.node.value,
                      level: top.level,
                      parentId: top.parentId});
            
                      
            if (top.node.left)
                queue.push({node: top.node.left,
                level: top.level + 1,
                parentId : nodeId
            });
                
            if (top.node.right)
                queue.push({node: top.node.right,
                level: top.level + 1,
                parentId : nodeId
            });
            
            currentId++;
        }
        
        return data;
    }
}