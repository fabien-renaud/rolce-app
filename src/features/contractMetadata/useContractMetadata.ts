import {useDispatch, useSelector} from 'react-redux';
import {fetchContractMetadata, selectAllContractMetadata, selectContractMetadataIds} from './contractMetadataSlice';

export const useContractMetadata = () => {
    const dispatch = useDispatch();
    const contractMetadata = useSelector(selectAllContractMetadata);
    const contractMetadataIds = useSelector(selectContractMetadataIds);

    return {
        contractMetadata,
        contractMetadataIds,
        fetchContractMetadata: (
            offset?: number,
            limit?: number,
            fields?: string[],
            filters?: {key: string; value: string | null}[],
            orders?: {key: string; value: string | null}[]
        ) => dispatch(fetchContractMetadata({offset, limit, fields, filters, orders}))
    };
};
