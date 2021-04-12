export type ContractMeta = {
    reference: string;
    name: string;
    accountName: string;
};

export type Contract = {
    id: string;
    type: string;
    status: string;
    name: string;
    reference: string;
    accountName: string;
    comment: string;
    beginAt: string;
    endAt: string;
    totalAmount: number;
    currencyIso: string;
    createdAt: string;
    updatedAt: string;
};
