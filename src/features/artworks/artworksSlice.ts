import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import artworkService from './artworkService';
import {FetchAllParameters} from '../../utils';
import {Artwork} from './artworkType';

export const fetchAllArtworks = createAsyncThunk('artwork/fetchAll', async ({offset, limit, fields, filters, orders}: FetchAllParameters) =>
    artworkService.fetchAll(offset, limit, fields, filters, orders)
);

const artworksAdapter = createEntityAdapter<Artwork>({});

export const artworksSlice = createSlice({
    name: 'artworks',
    initialState: artworksAdapter.getInitialState({
        loading: false,
        contentRange: ''
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllArtworks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllArtworks.fulfilled, (state, action) => {
            if (action.payload) {
                artworksAdapter.upsertMany(state, action.payload.artworks);
                state.contentRange = action.payload.contentRange;
            }
            state.loading = false;
        });
    }
});

export default artworksSlice.reducer;

export const {
    selectIds: selectArtworkIds,
    selectEntities: selectArtworkEntities,
    selectAll: selectAllArtworks,
    selectTotal: selectTotalArtworks,
    selectById: selectArtworkById
} = artworksAdapter.getSelectors((state: State) => state.artworks);
