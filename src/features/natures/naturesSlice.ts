import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {Nature} from './natureType';
import natureService from './natureService';
import {FetchAllParameters} from '../../utils';

export const fetchAllNatures = createAsyncThunk('nature/fetchAll', async ({offset, limit, fields, filters}: FetchAllParameters) =>
    natureService.fetchAll(offset, limit, fields, filters)
);

const naturesAdapter = createEntityAdapter<Nature>({});

export const naturesSlice = createSlice({
    name: 'natures',
    initialState: naturesAdapter.getInitialState({
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllNatures.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllNatures.fulfilled, (state, action) => {
            if (action.payload) naturesAdapter.upsertMany(state, action.payload);
            state.loading = false;
        });
    }
});

export default naturesSlice.reducer;

export const {
    selectIds: selectNaturesIds,
    selectEntities: selectNatureEntities,
    selectAll: selectAllNatures,
    selectTotal: selectNatures,
    selectById: selectNatureById
} = naturesAdapter.getSelectors((state: State) => state.natures);
