import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {State} from 'store';
import {Language} from './languageType';
import languageService from './languageService';
import {FetchAllParameters} from '../../utils';

export const fetchAllLanguages = createAsyncThunk('language/fetchAll', async ({offset, limit, fields, filters, orders}: FetchAllParameters) =>
    languageService.fetchAll(offset, limit, fields, filters, orders)
);

const languagesAdapter = createEntityAdapter<Language>({});

export const languagesSlice = createSlice({
    name: 'languages',
    initialState: languagesAdapter.getInitialState({
        loading: false
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllLanguages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllLanguages.fulfilled, (state, action) => {
            if (action.payload) languagesAdapter.setAll(state, action.payload);
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
