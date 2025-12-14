class NodeHash
{
    key;
    value;
    next;

    // Constructor
    constructor(inKey, inValue, inNext = null)
    {
        this.key = inKey;
        this.value = inValue;
        this.next = inNext;
    }
}

class HashTable
{
    #buckets;
    #loadFactor;
    #bucketsSize;
    #_size;

    // Constructor
    constructor(inLoadFactor = 0.75, inBucketsSize = 16)
    {
        this.#buckets = [];
        this.#loadFactor = inLoadFactor;
        this.#bucketsSize = inBucketsSize;
        this.#_size = 0;

        for (let i = 0; i < this.#bucketsSize; i++)
            this.#buckets.push(null);
    }


    // Functions
    size()
    {
        return this.#_size;
    }
    
    #hash(inKey)
    {
        return inKey | 0;
    }

    #rehash()
    {
        let newBucketsSize = this.#bucketsSize * 2;
        let newBuckets = [];
        
        for (let i = 0; i < newBucketsSize; i++)
            newBuckets.push(null);

        // Start re-hash
        for (let i = 0; i < this.#bucketsSize; i++)
        {
            let tmp = this.#buckets[i];

            while(tmp != null)
            {
                let tempVal = tmp.value;
                let tempKey = tmp.key;

                let newIdx = this.#hash(tempKey) % newBucketsSize;
                newBuckets[newIdx] = new NodeHash(tempKey, tempVal, newBuckets[newIdx]);

                tmp = tmp.next;
            }
        }

        this.#buckets = newBuckets;
        this.#bucketsSize = newBucketsSize;
    }

    erase(inKey)
    {
        let index = this.#hash(inKey) % this.#bucketsSize;

        let prev = null;
        let it = this.#buckets[index];

        while (it != null)
        {
            if (it.key == inKey)
            {
                if (prev == null)
                    this.#buckets[index] = cur.next;
                else
                    prev.next = cur.next;

                this.#_size--;
                return;
            }

            prev = cur;
            cur = cur.next;
        }
    }
    // Getters
    get(inKey)
    {
        let index = this.#hash(inKey) % this.#bucketsSize;

        let found = false;

        let it = this.#buckets[index]; 
        while (it != null)
        {
            if (it.key == inKey)
            {
                found = true;
                break;
            }

            it = it.next;
        }
        
        if (found)
            return it.value;
        else
            return undefined;
    }

    set (inKey, inValue)
    {
        let index = this.#hash(inKey) % this.#bucketsSize;

        let found = false;

        let it = this.#buckets[index]; 
        while (it != null)
        {
            if (it.key == inKey)
            {
                found = true;
                break;
            }

            it = it.next;
        }
        
        if (found)
            it.value = inValue;
        else
        {
            this.#buckets[index] = new NodeHash(inKey, inValue, this.#buckets[index]);
            this.#_size++;
        }

        if (this.#_size > this.#loadFactor * this.#bucketsSize)
            this.#rehash();
    }
}