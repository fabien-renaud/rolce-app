import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, EntityId} from '@reduxjs/toolkit';
import {fetchContractMetadata, selectAllContractMetadata, selectContractMetadataIds} from './contractMetadataSlice';
import {ContractMetadata} from './contractMetadataType';
import {FetchAllParameters} from '../../utils';

export const useContractMetadata = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const contractMetadata: ContractMetadata[] = useSelector(selectAllContractMetadata);
    const contractMetadataIds: EntityId[] = useSelector(selectContractMetadataIds);

    return {
        contractMetadata,
        contractMetadataIds,
        fetchContractMetadata: (fetchAllParameters: FetchAllParameters) => dispatch(fetchContractMetadata(fetchAllParameters))
    };
};
