import {useDispatch, useSelector} from 'react-redux';
import {fetchContractMetadata, selectAllContractMetadata} from './contractMetadataSlice';

export const useContractMetadata = () => {
    const dispatch = useDispatch();
    const contractMetadata = useSelector(selectAllContractMetadata);

    return {
        contractMetadata,
        fetchContractsMeta: () => dispatch(fetchContractMetadata())
    };
};
