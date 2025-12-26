class NodeHash
{
    public key: number;
    public value: number;
    public next: NodeHash | null;

    // Constructor
    constructor(inKey: number, inValue: number, inNext: NodeHash | null = null)
    {
        this.key = inKey;
        this.value = inValue;
        this.next = inNext;
    }
}

class HashTable
{
    private buckets: (NodeHash | null)[];
    private loadFactor: number;
    private bucketsSize: number;
    private _size: number;

    // Constructor
    constructor(inLoadFactor: number = 0.75, inBucketsSize: number = 16)
    {
        this.buckets = [];
        this.loadFactor = inLoadFactor;
        this.bucketsSize = inBucketsSize;
        this._size = 0;

        for (let i = 0; i < this.bucketsSize; i++)
            this.buckets.push(null);
    }


    // Functions
    public size(): number
    {
        return this._size;
    }
    
    private hash(inKey: number): number
    {
        return inKey | 0;
    }

    private rehash(): void
    {
        let newBucketsSize: number = this.bucketsSize * 2;
        let newBuckets: (NodeHash | null)[] = [];
        
        for (let i = 0; i < newBucketsSize; i++)
            newBuckets.push(null);

        // Start re-hash
        for (let i = 0; i < this.bucketsSize; i++)
        {
            let tmp: NodeHash | null = this.buckets[i];

            while(tmp != null)
            {
                let tempVal: number = tmp.value;
                let tempKey: number = tmp.key;

                let newIdx = this.hash(tempKey) % newBucketsSize;
                newBuckets[newIdx] = new NodeHash(tempKey, tempVal, newBuckets[newIdx]);

                tmp = tmp.next;
            }
        }

        this.buckets = newBuckets;
        this.bucketsSize = newBucketsSize;
    }

    public erase(inKey: number): void
    {
        let index: number = this.hash(inKey) % this.bucketsSize;

        let prev: NodeHash | null = null;
        let it: NodeHash | null= this.buckets[index];

        while (it != null)
        {
            if (it.key == inKey)
            {
                if (prev == null)
                    this.buckets[index] = it.next;
                else
                    prev.next = it.next;

                this._size--;
                return;
            }

            prev = it;
            it = it.next;
        }
    }
    // Getters
    public get(inKey: number): number | undefined
    {
        let index: number = this.hash(inKey) % this.bucketsSize;

        let found: boolean = false;

        let it: NodeHash | null = this.buckets[index]; 
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
            return it!.value;
        else
            return undefined;
    }

    public set (inKey: number, inValue: number): void
    {
        let index: number = this.hash(inKey) % this.bucketsSize;

        let found: boolean = false;

        let it: NodeHash | null = this.buckets[index]; 
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
            it!.value = inValue;
        else
        {
            this.buckets[index] = new NodeHash(inKey, inValue, this.buckets[index]);
            this._size++;
        }

        if (this._size > this.loadFactor * this.bucketsSize)
            this.rehash();
    }
}