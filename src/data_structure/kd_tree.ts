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
    
}