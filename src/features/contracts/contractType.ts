export type Contract = {
    id: string;
    type: ContractType;
    status: ContractStatus;
    name: string;
    reference: string;
    accountName: string;
    comment: string;
    beginAt: string;
    endAt: string;
    totalAmount: number;
    currencyIso: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ContractType = 'ACQUISITION' | 'SALE';
export type ContractStatus = 'INTEREST' | 'NEGOTIATION' | 'SIGNED';
