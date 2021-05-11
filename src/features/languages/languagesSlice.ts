import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {Language} from './languageType';
import {fetchAll, FetchAllParameters} from '../../utils';

export const fetchAllLanguages = createAsyncThunk('language/fetchAll', async ({offset, limit, fields, filters, orders}: FetchAllParameters) =>
    fetchAll<Language>('language', offset, limit, fields, filters, orders)
);

const languagesAdapter = createEntityAdapter<Language>({});

export const languagesSlice = createSlice({
    name: 'languages',
    initialState: languagesAdapter.getInitialState({
        loading: false,
        contentRange: ''
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllLanguages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllLanguages.fulfilled, (state, action) => {
            languagesAdapter.setAll(state, action.payload.datas);
            state.contentRange = action.payload.contentRange;
            state.loading = false;
        });
    }
});

export default languagesSlice.reducer;

export const {
    selectIds: selectLanguageIds,
    selectEntities: selectLanguageEntities,
    selectAll: selectAllLanguages,
    selectTotal: selectTotalLanguages,
    selectById: selectLanguageById
} = languagesAdapter.getSelectors((state: State) => state.languages);
