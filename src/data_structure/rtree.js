class Rect 
{
    minX;
    minY;
    maxX;
    maxY;

    constructor(inMinX = 0, inMinY = 0, inMaxX = 0, inMaxY = 0) 
    {
        this.minX = inMinX;
        this.minY = inMinY;
        this.maxX = inMaxX;
        this.maxY = inMaxY;
    }

    combine(inOtherRect) 
    {
        return new Rect(
            Math.min(this.minX, inOtherRect.minX),
            Math.min(this.minY, inOtherRect.minY),
            Math.max(this.maxX, inOtherRect.maxX),
            Math.max(this.maxY, inOtherRect.maxY)
        );
    }

    area() 
    {
        return (this.maxX - this.minX) * (this.maxY - this.minY);
    }
}

const MAX_ENTRIES = 4;

class Entry 
{
    rect;
    child;

    constructor(inRect, inChild = null) 
    {
        this.rect = inRect;
        this.child = inChild;
    }
}

class Node 
{
    isLeaf;
    entries;

    constructor(inIsLeaf = true) 
    {
        this.isLeaf = inIsLeaf;
        this.entries = [];
    }
}

class RTree {
    root;

    constructor() 
    {
        this.root = new Node(true);
    }

    insert(inValue) 
    {
        let node = this.root;
        let path = [];

        while (!node.isLeaf) 
        {
            let idx = this.chooseSubtree(node, inValue);
            path.push({ node: node, index: idx });
            node = node.entries[idx].child;
        }

        node.entries.push(new Entry(inValue));

        let sibling = null;
        if (node.entries.length > MAX_ENTRIES) 
        {
            sibling = this.splitNodeGreene(node);
        }

        this.adjustTree(path, node, sibling);
    }

    chooseSubtree(inNode, inValue) 
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

   adjustTree(inPath, inNode, inSibling) 
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
                sibling = this.splitNodeGreene(parent);
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

    splitNodeGreene(inNode) 
    {
        let axis = this.chooseAxis(inNode);
        return this.distribute(inNode, axis);
    }

    chooseAxis(inNode) 
    {
        let hx = -Infinity, lx = Infinity;
        let hy = -Infinity, ly = Infinity;
        let maxx = -Infinity, minx = Infinity;
        let maxy = -Infinity, miny = Infinity;

        for (let e of inNode.entries) 
        {
            hx = Math.max(hx, e.rect.minX);
            lx = Math.min(lx, e.rect.maxX);
            hy = Math.max(hy, e.rect.minY);
            ly = Math.min(ly, e.rect.maxY);

            maxx = Math.max(maxx, e.rect.maxX);
            minx = Math.min(minx, e.rect.minX);
            maxy = Math.max(maxy, e.rect.maxY);
            miny = Math.min(miny, e.rect.minY);
        }

        let rangeX = maxx - minx;
        let rangeY = maxy - miny;

        let gapX = rangeX > 0 ? (hx - lx) / rangeX : 0;
        let gapY = rangeY > 0 ? (hy - ly) / rangeY : 0;

        if (gapX === 0 && gapY === 0) 
        {
            return rangeY > rangeX ? 1 : 0;
        }

        return gapX > gapY ? 0 : 1;
    }

    distribute(inNode, inAxis) 
    {
        let es = inNode.entries;

        if (inAxis === 0)
            es.sort((a, b) => a.rect.minX - b.rect.minX);
        else
            es.sort((a, b) => a.rect.minY - b.rect.minY);

        let sibling = new Node(inNode.isLeaf);

        let half = Math.floor(es.length / 2);
        sibling.entries = es.splice(0, half);

        return sibling;
    }

    boundingRect(inEntries) 
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