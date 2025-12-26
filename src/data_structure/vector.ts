class Vector
{
    private data: number[];

    // Constructor
    public constructor()
    {
        this.data = []
    }
    
    // Functions
    public size()
    {
        return this.data.length;
    }

    public pushBack(inValue: number)
    {
        this.data.push(inValue);
    }

    public popBack()
    {
        if (this.data.length <= 0)
            return undefined;
        
        return this.data.pop();
    }

    public insert(inIdx: number, inValue: number)
    {
        this.data.splice(inIdx, 0, inValue);
    }
    
    public remove(inIdx: number)
    {
        if (this.data.length <= 0 || inIdx >= this.data.length || inIdx < 0)
            return undefined;
        
        this.data.splice(inIdx, 1);
    }

    // Getter & setter
    public get(inIdx: number)
    {
        if (inIdx >= this.data.length || inIdx < 0)
            return undefined;

        return this.data[inIdx];
    }

    public set(inIdx: number, inValue: number)
    {
        if (inIdx >= this.data.length || inIdx < 0)
            return undefined;
        this.data[inIdx] = inValue;
    }
}