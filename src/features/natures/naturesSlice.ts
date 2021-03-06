import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {Nature} from './natureType';
import {fetchAll, FetchAllParameters} from '../../utils';

export const fetchAllNatures = createAsyncThunk('nature/fetchAll', async (fetchAllParameters: FetchAllParameters) =>
    fetchAll<Nature>('nature', fetchAllParameters)
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
            if (action.payload) naturesAdapter.upsertMany(state, action.payload.datas);
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
