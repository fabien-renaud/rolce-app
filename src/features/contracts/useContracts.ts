import {EntityId} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {fetchContractById, selectContractById} from './contractsSlice';
import {Contract} from './contractType';

export const useContracts = (id: EntityId) => {
    const dispatch = useDispatch();
    const selectedContract: Contract | undefined = useSelector((state: State) => selectContractById(state, id));

    return {
        selectedContract,
        fetchContract: () => dispatch(fetchContractById(id))
    };
};
