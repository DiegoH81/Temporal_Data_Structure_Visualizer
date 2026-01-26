class Rect 
{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;

    constructor(inMinX: number = 0, inMinY: number = 0, inMaxX: number = 0, inMaxY: number = 0) 
    {
        this.minX = inMinX;
        this.minY = inMinY;
        this.maxX = inMaxX;
        this.maxY = inMaxY;
    }

    combine(inOtherRect: Rect): Rect 
    {
        return new Rect(
            Math.min(this.minX, inOtherRect.minX),
            Math.min(this.minY, inOtherRect.minY),
            Math.max(this.maxX, inOtherRect.maxX),
            Math.max(this.maxY, inOtherRect.maxY)
        );
    }

    area(): number 
    {
        return (this.maxX - this.minX) * (this.maxY - this.minY);
    }
}

const MAX_ENTRIES: number = 4;
const MIN_ENTRIES: number = Math.ceil(MAX_ENTRIES / 2);

class Entry 
{
    rect: Rect;
    child: Node | null;

    constructor(inRect: Rect, inChild: Node | null = null) 
    {
        this.rect = inRect;
        this.child = inChild;
    }
}

class Node 
{
    isLeaf: boolean;
    entries: Entry[];

    constructor(inIsLeaf: boolean = true) 
    {
        this.isLeaf = inIsLeaf;
        this.entries = [];
    }
}

class RTree {
    root: Node;

    constructor() 
    {
        this.root = new Node(true);
    }

    insert(inValue: Rect): void 
    {
        let node = this.root;
        let path: { node: Node; index: number }[] = [];

        while (!node.isLeaf) 
        {
            let idx = this.chooseSubtree(node, inValue);
            path.push({ node: node, index: idx });
            node = node.entries[idx].child as Node;
        }

        node.entries.push(new Entry(inValue));

        let sibling: Node | null = null;
        if (node.entries.length > MAX_ENTRIES) 
        {
            sibling = this.splitNodeQuadratic(node);
        }

        this.adjustTree(path, node, sibling);
    }

    chooseSubtree(inNode: Node, inValue: Rect): number 
    {
        let minEnlargement = Infinity;
        let bestIdx = 0;

        for (let i = 0; i < inNode.entries.length; i++) 
        {
            let combined = inNode.entries[i].rect.combine(inValue);
            let enlargement = combined.area() - inNode.entries[i].rect.area();

            if (enlargement < minEnlargement) 
            {
                minEnlargement = enlargement;
                bestIdx = i;
            }
        }
        return bestIdx;
    }

   adjustTree(inPath: { node: Node; index: number }[], inNode: Node, inSibling: Node | null): void 
   {
        let node = inNode;
        let sibling = inSibling;

        for (let i = inPath.length - 1; i >= 0; i--) 
        {
            let parent = inPath[i].node;
            let childIndex = inPath[i].index;

            parent.entries[childIndex].rect = this.boundingRect(node.entries);

            if (sibling) 
            {
                parent.entries.push(
                    new Entry(this.boundingRect(sibling.entries), sibling)
                );

                if (parent.entries.length > MAX_ENTRIES) 
                {
                    sibling = this.splitNodeQuadratic(parent);
                } 
                else
                {
                    sibling = null;
                }
            }
            
            node = parent;
        }

        if (sibling) 
        {
            let oldRoot = this.root;
            this.root = new Node(false);
            this.root.entries.push(new Entry(this.boundingRect(oldRoot.entries), oldRoot));
            this.root.entries.push(new Entry(this.boundingRect(sibling.entries), sibling));
        }
    }

    pickSeeds(inEntries: Entry[]): [number, number] {
        let maxWaste = -Infinity;
        let seed1 = 0;
        let seed2 = 1;

        for (let i = 0; i < inEntries.length; i++) {
            for (let j = i + 1; j < inEntries.length; j++) {
                const r1 = inEntries[i].rect;
                const r2 = inEntries[j].rect;
                const combined = r1.combine(r2);

                const waste = combined.area() - r1.area() - r2.area();

                if (waste > maxWaste) {
                    maxWaste = waste;
                    seed1 = i;
                    seed2 = j;
                }
            }
        }
        return [seed1, seed2];
    }

    splitNodeQuadratic(node: Node): Node {
        const entries = node.entries;
        node.entries = [];

        const sibling = new Node(node.isLeaf);

        const [i1, i2] = this.pickSeeds(entries);

        const e1 = entries[i1];
        const e2 = entries[i2];

        const remaining = entries.filter((_, i) => i !== i1 && i !== i2);

        node.entries.push(e1);
        sibling.entries.push(e2);

        while (remaining.length > 0) {

            if (node.entries.length + remaining.length === MIN_ENTRIES) {
                node.entries.push(...remaining);
                break;
            }

            if (sibling.entries.length + remaining.length === MIN_ENTRIES) {
                sibling.entries.push(...remaining);
                break;
            }

            let bestIdx = 0;
            let bestDiff = -Infinity;
            let assignToNode = true;

            const rectNode = this.boundingRect(node.entries);
            const rectSibling = this.boundingRect(sibling.entries);

            for (let i = 0; i < remaining.length; i++) {
                const e = remaining[i];

                const enlargeNode = rectNode.combine(e.rect).area() - rectNode.area();

                const enlargeSibling = rectSibling.combine(e.rect).area() - rectSibling.area();

                const diff = Math.abs(enlargeNode - enlargeSibling);

                if (diff > bestDiff) {
                    bestDiff = diff;
                    bestIdx = i;
                    assignToNode = enlargeNode < enlargeSibling;
                }
            }

            const chosen = remaining.splice(bestIdx, 1)[0];
            (assignToNode ? node.entries : sibling.entries).push(chosen);
        }

        return sibling;
    }

    boundingRect(inEntries: Entry[]): Rect 
    {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;

        for (let e of inEntries) 
        {
            minX = Math.min(minX, e.rect.minX);
            minY = Math.min(minY, e.rect.minY);
            maxX = Math.max(maxX, e.rect.maxX);
            maxY = Math.max(maxY, e.rect.maxY);
        }

        return new Rect(minX, minY, maxX, maxY);
    }
}
