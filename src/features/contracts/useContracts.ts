import {EntityId} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {fetchContractById, selectContractById} from './contractsSlice';
import {Contract} from './contractType';

export const useContracts = (id: EntityId) => {
    const dispatch = useDispatch();
    const selectedContract: Contract | undefined = useSelector((state) => selectContractById(state, id));

    return {
        selectedContract,
        fetchContract: () => dispatch(fetchContractById(id))
    };
};
