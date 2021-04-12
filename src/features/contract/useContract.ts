import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../store';
import {fetchContractsMetadata} from './contractService';
import {addContractMetadata} from './contractSlice';

export const useContract = () => {
    const dispatch = useDispatch();
    const contractsMetadata = useSelector((state: State) => state.contract.contractsMetadata);

    return {
        contractsMetadata,
        fetchContractsMeta: () => dispatch(addContractMetadata(fetchContractsMetadata()))
    };
};
