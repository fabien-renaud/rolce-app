import {configureStore} from '@reduxjs/toolkit';
import contractReducer from '../features/contract/contractSlice';

const store = configureStore({
    reducer: {
        contract: contractReducer
    }
});

export default store;
