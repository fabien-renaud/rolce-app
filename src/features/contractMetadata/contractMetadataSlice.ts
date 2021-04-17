import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import contractMetadataService from './contractMetadataService';
import {ContractMetadata} from './contractMetadataType';

export const fetchContractMetadata = createAsyncThunk('contractMetadata/fetchAll', contractMetadataService.fetchAll);

const contractMetadataAdapter = createEntityAdapter<ContractMetadata>({
    selectId: (metadata) => metadata.reference
});

export const contractMetadataSlice = createSlice({
    name: 'contractMetadata',
    initialState: contractMetadataAdapter.getInitialState({
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContractMetadata.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchContractMetadata.fulfilled, (state, action) => {
            contractMetadataAdapter.upsertMany(state, action.payload);
            state.loading = false;
        });
    }
});

export default contractMetadataSlice.reducer;

export const {
    selectIds: selectContractMetadataIds,
    selectEntities: selectContractMetadataEntities,
    selectAll: selectAllContractMetadata,
    selectTotal: selectTotalContractMetadataTotal,
    selectById: selectContractMetadataById
} = contractMetadataAdapter.getSelectors((state) => {
    // @ts-ignore
    return state.contractMetadata;
});
