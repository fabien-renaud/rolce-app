export type Contract = {
    id: string;
    type: ContractType;
    status: ContractStatus;
    name: string;
    reference: string;
    account: {name: string};
    comment: string;
    begin_at: string;
    end_at: string;
    totalAmount: number;
    currencyIso: string;
    created_at: Date;
    updated_at: Date;
};

export type ContractType = 'ACQUISITION' | 'SALE';
export type ContractStatus = 'INTEREST' | 'NEGOTIATION' | 'SIGNED';
