import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Language} from './languageType';
import {fetchAllLanguages, selectAllLanguages} from './languagesSlice';
import {FetchAllParameters} from '../../utils';

export const useLanguages = () => {
    const dispatch = useDispatch();
    const languages: Language[] = useSelector((state: State) => selectAllLanguages(state));
    const fetching: boolean = useSelector((state: State) => state.languages.loading);
    const contentRange: string = useSelector((state: State) => state.languages.contentRange);

    return {
        languages,
        fetching,
        contentRange,
        fetchLanguages: (fetchAllParameters: FetchAllParameters) => dispatch(fetchAllLanguages(fetchAllParameters))
    };
};
