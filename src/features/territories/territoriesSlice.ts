import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {Territory} from './territoryType';
import {fetchAll, FetchAllParameters} from '../../utils';

export const fetchAllTerritories = createAsyncThunk('territory/fetchAll', async (fetchAllParameters: FetchAllParameters) =>
    fetchAll<Territory>('territory', fetchAllParameters)
);

const territoriesAdapter = createEntityAdapter<Territory>({});

export const territoriesSlice = createSlice({
    name: 'territories',
    initialState: territoriesAdapter.getInitialState({
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllTerritories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllTerritories.fulfilled, (state, action) => {
            if (action.payload) territoriesAdapter.upsertMany(state, action.payload.datas);
            state.loading = false;
        });
    }
});

export default territoriesSlice.reducer;

export const {
    selectIds: selectTerritoriesIds,
    selectEntities: selectTerritoryEntities,
    selectAll: selectAllTerritories,
    selectTotal: selectTerritories,
    selectById: selectTerritoryById
} = territoriesAdapter.getSelectors((state: State) => state.territories);
