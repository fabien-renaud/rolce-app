import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {fetchAll, FetchAllParameters} from '../../utils';
import {Artwork} from './artworkType';

export const fetchAllArtworks = createAsyncThunk('artwork/fetchAll', async (fetchAllParameters: FetchAllParameters) =>
    fetchAll<Artwork>('artwork', fetchAllParameters)
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
            artworksAdapter.setAll(state, action.payload.datas);
            state.contentRange = action.payload.contentRange;
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
