import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Territory} from './territoryType';
import {fetchAllTerritories, selectAllTerritories} from './territoriesSlice';

export const useTerritories = (offset?: number, limit?: number, name?: string) => {
    const dispatch = useDispatch();
    const territories: Territory[] = useSelector((state: State) => selectAllTerritories(state));

    return {
        territories,
        fetchTerritories: () => dispatch(fetchAllTerritories({offset, limit, name}))
    };
};
