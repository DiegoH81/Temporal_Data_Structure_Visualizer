class Stack
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

    push(inValue)
    {
        this.#data.push(inValue);
    }

    pop()
    {
        return this.#data.pop();
    }

    // Getter
    top()
    {
        return this.#data[this.#data.length - 1];
    }
}