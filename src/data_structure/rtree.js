class Rect {
    minX;
    minY;
    maxX;
    maxY;

    constructor(inMinX = 0, inMinY = 0, inMaxX = 0, inMaxY = 0) {
        this.minX = inMinX;
        this.minY = inMinY;
        this.maxX = inMaxX;
        this.maxY = inMaxY;
    }

    overlaps(inOtherRect) {
        return !(
            this.minX > inOtherRect.maxX ||
            this.maxX < inOtherRect.minX ||
            this.minY > inOtherRect.maxY ||
            this.maxY < inOtherRect.minY
        );
    }

    contains(inOtherRect) {
        return (
            this.minX <= inOtherRect.minX &&
            this.maxX >= inOtherRect.maxX &&
            this.minY <= inOtherRect.minY &&
            this.maxY >= inOtherRect.maxY
        );
    }

    combine(inOtherRect) {
        return new Rect(
            Math.min(this.minX, inOtherRect.minX),
            Math.min(this.minY, inOtherRect.minY),
            Math.max(this.maxX, inOtherRect.maxX),
            Math.max(this.maxY, inOtherRect.maxY)
        );
    }

    area() {
        return (this.maxX - this.minX) * (this.maxY - this.minY);
    }

    equal(inOtherRect) {
        return (
            this.minX === inOtherRect.minX &&
            this.minY === inOtherRect.minY &&
            this.maxX === inOtherRect.maxX &&
            this.maxY === inOtherRect.maxY
        );
    }
}

const MAX_ENTRIES = 4;
const MIN_ENTRIES = 1;

class Entry {
    rect;
    child;

    constructor(inRect, inChild = null) {
        this.rect = inRect;
        this.child = inChild;
    }
}

class Node {
    isLeaf;
    entries;

    constructor(inIsLeaf = true) {
        this.isLeaf = inIsLeaf;
        this.entries = [];
    }
}


class RTree {
    root;

    constructor() {
        this.root = new Node(true);
    }

    insert(inValue) {
        let node = this.root;
        let path = [];
        let indices = [];

        while (!node.isLeaf) {
            let idx = this.chooseSubtree(node, inValue);
            path.push(node);
            indices.push(idx);
            node = node.entries[idx].child;
        }

        node.entries.push(new Entry(inValue));

        if (node.entries.length > MAX_ENTRIES) {
            let sibling = this.splitNodeGreene(node);
            this.adjustTree(path, indices, node, sibling);
        } else {
            this.adjustTree(path, indices, node, null);
        }
    }

    chooseSubtree(inNode, inValue) {
        let minEnlargement = Infinity;
        let bestIdx = 0;

        for (let i = 0; i < inNode.entries.length; i++) {
            let combined = inNode.entries[i].rect.combine(inValue);
            let enlargement =
                combined.area() - inNode.entries[i].rect.area();

            if (enlargement < minEnlargement) {
                minEnlargement = enlargement;
                bestIdx = i;
            }
        }
        return bestIdx;
    }

    adjustTree(inPath, inIndices, inChild1, inChild2) {
        let i = inPath.length - 1;

        while (i >= 0) {
            let parent = inPath[i];
            let idx = inIndices[i];

            parent.entries[idx].rect =
                this.boundingRect(parent.entries[idx].child.entries);

            if (inChild2) {
                parent.entries.push(
                    new Entry(
                        this.boundingRect(inChild2.entries),
                        inChild2
                    )
                );

                if (parent.entries.length > MAX_ENTRIES) {
                    inChild2 = this.splitNodeGreene(parent);
                } else {
                    inChild2 = null;
                }
            }
            i--;
        }

        if (inChild2) {
            let oldRoot = this.root;
            this.root = new Node(false);
            this.root.entries.push(
                new Entry(this.boundingRect(oldRoot.entries), oldRoot)
            );
            this.root.entries.push(
                new Entry(this.boundingRect(inChild2.entries), inChild2)
            );
        }
    }

    splitNodeGreene(inNode) {
        let axis = this.chooseAxis(inNode);
        return this.distribute(inNode, axis);
    }

    chooseAxis(inNode) {
        let hx = -Infinity, lx = Infinity;
        let hy = -Infinity, ly = Infinity;
        let maxx = -Infinity, minx = Infinity;
        let maxy = -Infinity, miny = Infinity;

        for (let e of inNode.entries) {
            hx = Math.max(hx, e.rect.minX);
            lx = Math.min(lx, e.rect.maxX);
            hy = Math.max(hy, e.rect.minY);
            ly = Math.min(ly, e.rect.maxY);

            maxx = Math.max(maxx, e.rect.maxX);
            minx = Math.min(minx, e.rect.minX);
            maxy = Math.max(maxy, e.rect.maxY);
            miny = Math.min(miny, e.rect.minY);
        }

        let gapX = (hx - lx) / (maxx - minx);
        let gapY = (hy - ly) / (maxy - miny);

        return gapX > gapY ? 0 : 1;
    }

    distribute(inNode, inAxis) {
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

    boundingRect(inEntries) {
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;

        for (let e of inEntries) {
            minX = Math.min(minX, e.rect.minX);
            minY = Math.min(minY, e.rect.minY);
            maxX = Math.max(maxX, e.rect.maxX);
            maxY = Math.max(maxY, e.rect.maxY);
        }

        return new Rect(minX, minY, maxX, maxY);
    }

    deleteEntry(inValue) {
        let path = [];
        let leaf = this.findLeaf(inValue, this.root, path);

        if (!leaf) return;

        leaf.entries = leaf.entries.filter(
            e => !e.rect.equal(inValue)
        );

        this.condenseTree(path);

        if (!this.root.isLeaf && this.root.entries.length === 1) {
            this.root = this.root.entries[0].child;
        }
    }

    findLeaf(inValue, inNode, inPath) {
        inPath.push(inNode);

        if (inNode.isLeaf) {
            for (let e of inNode.entries)
                if (e.rect.equal(inValue))
                    return inNode;
            return null;
        }

        for (let e of inNode.entries) {
            if (e.rect.overlaps(inValue)) {
                let res = this.findLeaf(inValue, e.child, inPath);
                if (res) return res;
            }
        }
        return null;
    }

    condenseTree(inPath) {
        let reinserts = [];

        while (inPath.length > 0) {
            let node = inPath.pop();

            if (node.entries.length < MIN_ENTRIES && node !== this.root) {
                reinserts.push(...node.entries);
                node.entries = [];
            } else {
                for (let e of node.entries)
                    if (e.child)
                        e.rect = this.boundingRect(e.child.entries);
            }
        }

        for (let e of reinserts)
            this.insert(e.rect);
    }
}
