import {configureStore} from '@reduxjs/toolkit';
import contractMetadataReducer from 'features/contractMetadata/contractMetadataSlice';
import contractsReducer from 'features/contracts/contractsSlice';
import languagesReducer from 'features/languages/languagesSlice';

const store = configureStore({
    reducer: {
        contractMetadata: contractMetadataReducer,
        contracts: contractsReducer,
        languages: languagesReducer
    }
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
