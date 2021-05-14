import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Territory} from './territoryType';
import {fetchAllTerritories, selectAllTerritories} from './territoriesSlice';
import {FetchAllParameters} from '../../utils';

export const useTerritories = () => {
    const dispatch = useDispatch();
    const territories: Territory[] = useSelector((state: State) => selectAllTerritories(state));

    return {
        territories,
        fetchTerritories: (fetchAllParameters: FetchAllParameters) => dispatch(fetchAllTerritories(fetchAllParameters))
    };
};
