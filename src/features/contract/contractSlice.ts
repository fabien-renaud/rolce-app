import {createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit';
import {Contract, ContractMeta} from './contractType';

const contractMetadataAdapter = createEntityAdapter<ContractMeta>({
    selectId: (contractMeta) => contractMeta.reference
});

const contractAdapter = createEntityAdapter<Contract>({
    selectId: (contract) => contract.reference
});

type ContractState = {
    contractsMetadata: EntityState<ContractMeta>;
    contracts: EntityState<Contract>;
    isLoading: boolean;
};

const initialState: ContractState = {
    contractsMetadata: contractMetadataAdapter.getInitialState(),
    contracts: contractAdapter.getInitialState(),
    isLoading: false
};

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        addContractMetadata: (state, action) => {
            contractMetadataAdapter.addMany(state.contractsMetadata, action.payload);
        },
        addContracts: (state, action) => {
            contractAdapter.addOne(state.contracts, action.payload);
        }
    }
});

export const {addContractMetadata, addContracts} = contractSlice.actions;
export default contractSlice.reducer;
