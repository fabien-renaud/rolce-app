import {useDispatch, useSelector} from 'react-redux';
import {fetchContractMetadata, selectAllContractMetadata, selectContractMetadataIds} from './contractMetadataSlice';
import {FetchAllParameters} from '../../utils';

export const useContractMetadata = () => {
    const dispatch = useDispatch();
    const contractMetadata = useSelector(selectAllContractMetadata);
    const contractMetadataIds = useSelector(selectContractMetadataIds);

    return {
        contractMetadata,
        contractMetadataIds,
        fetchContractMetadata: (fetchAllParameters: FetchAllParameters) => dispatch(fetchContractMetadata(fetchAllParameters))
    };
};
