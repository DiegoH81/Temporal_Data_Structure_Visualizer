export type DrawNode<T> = {
    id: number;
    value: T | T[];
    level: number;
    parentId: number | null;
};
