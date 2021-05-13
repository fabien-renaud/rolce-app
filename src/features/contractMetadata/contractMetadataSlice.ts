import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {ContractMetadata} from './contractMetadataType';
import {fetchAll, FetchAllParameters} from '../../utils';

export const fetchContractMetadata = createAsyncThunk('contractMetadata/fetchAll', async (fetchAllParameters: FetchAllParameters) =>
    fetchAll<ContractMetadata>('contract', fetchAllParameters)
);

const contractMetadataAdapter = createEntityAdapter<ContractMetadata>({
    selectId: (metadata) => metadata.reference
});

export const contractMetadataSlice = createSlice({
    name: 'contractMetadata',
    initialState: contractMetadataAdapter.getInitialState({
        error: '',
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContractMetadata.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchContractMetadata.fulfilled, (state, action) => {
            contractMetadataAdapter.upsertMany(state, action.payload.datas);
            state.loading = false;
        });
        builder.addCase(fetchContractMetadata.rejected, (state, action) => {
            state.error = action.error.message ?? 'An error has occurred';
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
} = contractMetadataAdapter.getSelectors((state: State) => state.contractMetadata);
