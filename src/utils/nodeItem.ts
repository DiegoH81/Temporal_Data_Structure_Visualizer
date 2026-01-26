export type NodeItem<T> = {
    node: T;
    level: number;
    parentId: number | null;
};
