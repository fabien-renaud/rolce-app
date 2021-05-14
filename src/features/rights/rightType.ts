import {ContractType} from '../contracts';

export type BillingTerm = {
    activityId: string;
    artworkId: string;
    price: number;
};

export type RightType = 'Acquisition' | 'Suspension' | 'Sale' | 'Holdback';

export type RightDto = {
    name: string;
    contractId: string;
    type: ContractType;
    billingTerms: BillingTerm[];
    beginAt: string;
    endAt: string;
    hasExclusivity: boolean;
    languagesId: string[];
    naturesId: string[];
    territoriesId: string[];
};
