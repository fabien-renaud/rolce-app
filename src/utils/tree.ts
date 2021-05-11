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
