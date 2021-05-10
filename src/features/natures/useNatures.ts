import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {fetchAllNatures, selectAllNatures} from './naturesSlice';
import {Nature} from './natureType';

export const useNatures = () => {
    const dispatch = useDispatch();
    const natures: Nature[] = useSelector((state: State) => selectAllNatures(state));

    return {
        natures,
        fetchNatures: (offset?: number, limit?: number, fields?: string[], filters?: {key: string; value: string | null}[]) =>
            dispatch(fetchAllNatures({offset, limit, fields, filters}))
    };
};
