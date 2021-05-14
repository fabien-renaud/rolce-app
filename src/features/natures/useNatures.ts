import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {fetchAllNatures, selectAllNatures} from './naturesSlice';
import {Nature} from './natureType';
import {FetchAllParameters} from '../../utils';

export const useNatures = () => {
    const dispatch = useDispatch();
    const natures: Nature[] = useSelector((state: State) => selectAllNatures(state));

    return {
        natures,
        fetchNatures: (fetchAllParameters: FetchAllParameters) => dispatch(fetchAllNatures(fetchAllParameters))
    };
};
