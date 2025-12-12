class Queue{
    #data;

    constructor()
    {
        this.#data = [];
    }

    push(inValue)
    {
        this.#data.push(inValue);
    }

    pop()
    {
        this.#data.shift()
    }
}