export type Contract = {
    id: string;
    type: string;
    status: ContractStatus;
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

export type ContractStatus = 'INTEREST' | 'NEGOTIATION' | 'SIGNED';
