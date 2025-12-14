class Graph
{
    #data;
    #nNodes;
    #nEdges;

    // Constructor
    constructor(inNodes)
    {
        this.#nNodes = inNodes;
        this.#data = [];
        this.#nEdges = 0;

        for (let i = 0; i < this.#nNodes; i++)
            this.#data.push([]);
        
    }

    addEdge(u, v)
    {
        if (u < 0 || u >= this.#nNodes || v < 0 || v >= this.#nNodes)
            return;

        this.#data[u].push(v);
        this.#data[v].push(u);

        this.#nEdges++;
    }
}