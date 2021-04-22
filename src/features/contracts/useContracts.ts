import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, EntityId} from '@reduxjs/toolkit';
import {State} from 'store';
import {fetchContractById, selectContractById} from './contractsSlice';
import {Contract} from './contractType';

export const useContracts = (id: EntityId) => {
    const dispatch: Dispatch<any> = useDispatch();
    const selectedContract: Contract | undefined = useSelector((state: State) => selectContractById(state, id));
    const loading: boolean = useSelector((state: State) => state.contracts.loading);

    return {
        loading,
        selectedContract,
        fetchContract: () => dispatch(fetchContractById(id))
    };
};
