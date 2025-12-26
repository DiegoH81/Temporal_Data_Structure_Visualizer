class Vector
{
    private data: number[];

    // Constructor
    public constructor()
    {
        this.data = []
    }
    
    // Functions
    public size(): number
    {
        return this.data.length;
    }

    public pushBack(inValue: number): void
    {
        this.data.push(inValue);
    }

    public popBack(): number | undefined
    {
        if (this.data.length <= 0)
            return undefined;
        
        return this.data.pop();
    }

    public insert(inIdx: number, inValue: number): void
    {
        this.data.splice(inIdx, 0, inValue);
    }
    
    public remove(inIdx: number): void | undefined
    {
        if (this.data.length <= 0 || inIdx >= this.data.length || inIdx < 0)
            return undefined;
        
        this.data.splice(inIdx, 1);
    }

    // Getter & setter
    public get(inIdx: number) : number | undefined
    {
        if (inIdx >= this.data.length || inIdx < 0)
            return undefined;

        return this.data[inIdx];
    }

        public set(inIdx: number, inValue: number): void | undefined
        {
            if (inIdx >= this.data.length || inIdx < 0)
                return undefined;
            this.data[inIdx] = inValue;
        }
}