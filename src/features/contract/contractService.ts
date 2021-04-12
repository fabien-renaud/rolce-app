import {Contract, ContractMeta} from './contractType';
import {contracts} from './contracts';

export const fetchContractsMetadata = (): ContractMeta[] => {
    return contracts.map((contract) => ({
        reference: contract.reference,
        name: contract.name,
        accountName: contract.accountName
    }));
};

export const fetchContractById = (reference: string): Contract | undefined => {
    return contracts.find((contract) => contract.reference === reference);
};
