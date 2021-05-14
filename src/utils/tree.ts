interface Tree {
    id: string;
    parentId?: string;
}

export type DataTree = {
    children: DataTree[];
    value: string;
};

export const createDataTree = <T extends Tree>(dataset: T[]) => {
    const hashTable = Object.create(null);
    dataset.forEach((aData) => {
        hashTable[aData.id] = {...aData, children: [], value: aData.id};
    });
    const dataTree: DataTree[] = [];
    dataset.forEach((aData) => {
        if (aData.parentId) hashTable[aData.parentId].children.push(hashTable[aData.id]);
        else dataTree.push(hashTable[aData.id]);
    });
    return dataTree;
};

const findNested = (data: DataTree[], value: string): DataTree | undefined =>
    data.find((dt) => value === dt.value) || data.map((dt) => (dt.children ? findNested(dt.children, value) : undefined)).find((dt) => !!dt);
const getNestedChildrenIds = (data: DataTree[]): string[] =>
    data.reduce(
        (acc, dt) => {
            const childrenIds = getNestedChildrenIds(dt.children);
            return childrenIds ? [...acc, ...childrenIds] : acc;
        },
        data.map(({value}) => value)
    );
export const geAllNestedChildrenIds = (tree: DataTree[], id: string): string[] => {
    const foundNested = findNested(tree, id);
    return foundNested ? getNestedChildrenIds(foundNested.children) : [];
};
