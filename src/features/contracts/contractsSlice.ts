import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import contractService from './contractService';
import {Contract} from './contractType';

export const fetchContract = createAsyncThunk('contractMetadata/fetchAll', async (reference: string) =>
    contractService.fetchById(reference)
);

const contractsAdapter = createEntityAdapter<Contract>({
    selectId: (contract) => contract.reference
});

export const contractsSlice = createSlice({
    name: 'contracts',
    initialState: contractsAdapter.getInitialState({
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContract.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchContract.fulfilled, (state, action) => {
            if (action.payload) contractsAdapter.upsertOne(state, action.payload);
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
} = contractsAdapter.getSelectors((state) => {
    // @ts-ignore
    return state.contracts;
});
