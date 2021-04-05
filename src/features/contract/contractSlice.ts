import {createSlice} from '@reduxjs/toolkit';
import {Contract} from './contractType';

type ContractState = {
    data: Contract[];
    isLoading: boolean;
};

const initialState: ContractState = {
    data: [],
    isLoading: false
};

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        save: (state) => state
    }
});

export const {save} = contractSlice.actions;
export default contractSlice.reducer;
