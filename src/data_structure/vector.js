class Vector
{
    #data;

    // Constructor
    constructor()
    {
        this.#data = []
    }
    
    // Functions
    size()
    {
        return this.#data.length;
    }

    pushBack(inValue)
    {
        this.#data.push(inValue);
    }

    popBack()
    {
        if (this.#data.length <= 0)
            return undefined;
        
        return this.#data.pop();
    }

    insert(inIdx, inValue)
    {
        this.#data.splice(inIdx, 0, inValue);
    }
    
    remove(inIdx)
    {
        if (this.#data.length <= 0 || inIdx >= this.#data.length || inIdx < 0)
            return undefined;
        
        this.#data.splice(inIdx, 1);
    }

    // Getter & setter
    get(inIdx)
    {
        if (inIdx >= this.#data.length || inIdx < 0)
            return undefined;

        return this.#data[inIdx];
    }

    set(inIdx, inValue)
    {
        if (inIdx >= this.#data.length || inIdx < 0)
            return undefined;
        this.#data[inIdx] = inValue;
    }
}