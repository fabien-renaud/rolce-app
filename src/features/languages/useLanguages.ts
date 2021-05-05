import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Language} from './languageType';
import {fetchAllLanguages, selectAllLanguages} from './languagesSlice';

export const useLanguages = (offset?: number, limit?: number, name?: string) => {
    const dispatch = useDispatch();
    const languages: Language[] = useSelector((state: State) => selectAllLanguages(state));

    return {
        languages,
        fetchLanguages: () => dispatch(fetchAllLanguages({offset, limit, name}))
    };
};
