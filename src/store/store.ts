import {configureStore} from '@reduxjs/toolkit';
import contractMetadataReducer from 'features/contractMetadata/contractMetadataSlice';
import contractsReducer from 'features/contracts/contractsSlice';

const store = configureStore({
    reducer: {
        contractMetadata: contractMetadataReducer,
        contracts: contractsReducer
    }
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
