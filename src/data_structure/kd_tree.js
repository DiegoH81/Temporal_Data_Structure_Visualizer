class NodeKDTree
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

class KDTree
{
    #root;
    #_size;
    #nDims

    // Constructor
    constructor(inNDims)
    {
        this.#root = null;
        this.#_size = 0;
        this.#nDims = inNDims;
    }


    // Functions
    size()
    {
        return this.#_size;
    }
    
    build (inValues)
    {
        this.#root = this.#build(inValues, 0);
    }

    #build (inValues, depth)
    {
        if (inValues.length == 0) // In array is empty
            return null;

        let curDim = depth % this.#nDims;

        inValues.sort((a, b) => a[curDim] - b[curDim]);

        let mid = Math.floor(inValues.length / 2);

        let node = new NodeKDTree(inValues[mid]);
        this.#_size++;

        node.left = this.#build (inValues.slice(0, mid), depth + 1);
        node.right = this.#build (inValues.slice(mid + 1, inValues.length), depth + 1);

        return node;
    }
    
}