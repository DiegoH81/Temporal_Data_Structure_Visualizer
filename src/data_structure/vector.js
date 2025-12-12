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
        return this.#data.pop();
    }

    insert(inIdx, inValue)
    {
        this.#data.splice(inIdx, 0, inValue);
    }
    
    remove(inIdx)
    {
        this.#data.splice(inIdx, 1);
    }

    // Getter & setter
    get(inIdx)
    {
        return this.#data[inIdx];
    }

    set(inIdx, inValue)
    {
        this.#data[inIdx] = inValue;
    }
}