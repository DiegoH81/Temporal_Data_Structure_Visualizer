class Graph
{
    private data: number[][];
    private nNodes: number;
    private nEdges: number;

    // Constructor
    constructor(inNodes: number)
    {
        this.nNodes = inNodes;
        this.data = [];
        this.nEdges = 0;

        for (let i = 0; i < this.nNodes; i++)
            this.data.push([]);
        
    }

    public addEdge(u: number, v: number): void
    {
        if (u < 0 || u >= this.nNodes || v < 0 || v >= this.nNodes)
            return;

        this.data[u].push(v);
        this.data[v].push(u);

        this.nEdges++;
    }
}