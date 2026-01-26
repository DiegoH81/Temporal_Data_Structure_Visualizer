import { type DrawNode } from "../utils/draw_node";
import { type NodeItem } from "../utils/nodeItem";
import { QueueAUX } from "../utils/queueAUX";

type Point = number[];

class NodeKDTree
{
    value: Point;
    left: NodeKDTree | null;
    right: NodeKDTree | null;

    // Constructor
    constructor(inValue: Point, inLeft: NodeKDTree | null = null, inRight = null)
    {
        this.value = inValue;
        this.left = inLeft;
        this.right = inRight;
    }
}

class KDTree
{
    private root: NodeKDTree | null;
    private _size: number;
    private nDims: number;

    // Constructor
    constructor(inNDims: number)
    {
        this.root = null;
        this._size = 0;
        this.nDims = inNDims;
    }


    // Functions
    public size(): number
    {
        return this._size;
    }
    
    public build (inPoints: Point[]): void
    {
        this.root = this.recursiveBuild(inPoints, 0);
    }

    private recursiveBuild (inPoints: Point[], depth: number)
    {
        if (inPoints.length == 0) // If array is empty
            return null;

        let curDim: number = depth % this.nDims;

        inPoints.sort((a, b) => a[curDim] - b[curDim]);

        let mid: number = Math.floor(inPoints.length / 2);

        let node: NodeKDTree = new NodeKDTree(inPoints[mid]);
        this._size++;

        node.left = this.recursiveBuild(inPoints.slice(0, mid), depth + 1);
        node.right = this.recursiveBuild(inPoints.slice(mid + 1, inPoints.length), depth + 1);

        return node;
    }
    
    // Travel
    public travel() :DrawNode<Point>[]
    {
        let data: DrawNode<Point>[] = []

        let currentId: number = 0;
        let queue = new QueueAUX<NodeItem<NodeKDTree>>();
        
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