import {createAsyncThunk, createEntityAdapter, createSlice, EntityId} from '@reduxjs/toolkit';
import {State} from 'store';
import contractService from './contractService';
import {Contract} from './contractType';

export const fetchContractById = createAsyncThunk('contract/fetchById', async (reference: EntityId) => contractService.fetchById(reference));

const contractsAdapter = createEntityAdapter<Contract>({
    selectId: (contract) => contract.reference
});

export const contractsSlice = createSlice({
    name: 'contracts',
    initialState: contractsAdapter.getInitialState({
        error: '',
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContractById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchContractById.fulfilled, (state, action) => {
            if (action.payload) contractsAdapter.upsertOne(state, action.payload);
            state.loading = false;
        });
        builder.addCase(fetchContractById.rejected, (state, action) => {
            state.error = action.error.message ?? 'An error has occurred';
            state.loading = false;
        });
    }
});

export default contractsSlice.reducer;

export const {
    selectIds: selectContractIds,
    selectEntities: selectContractEntities,
    selectAll: selectAllContract,
    selectTotal: selectTotalContractTotal,
    selectById: selectContractById
} = contractsAdapter.getSelectors((state: State) => state.contracts);
