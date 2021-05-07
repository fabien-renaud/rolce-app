import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Territory} from './territoryType';
import {fetchAllTerritories, selectAllTerritories} from './territoriesSlice';

export const useTerritories = () => {
    const dispatch = useDispatch();
    const territories: Territory[] = useSelector((state: State) => selectAllTerritories(state));

    return {
        territories,
        fetchTerritories: (offset?: number, limit?: number, fields?: string[], filters?: {key: string; value: string | null}[]) =>
            dispatch(fetchAllTerritories({offset, limit, fields, filters}))
    };
};
