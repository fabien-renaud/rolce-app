import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {Language} from './languageType';
import {fetchAllLanguages, selectAllLanguages} from './languagesSlice';

export const useLanguages = () => {
    const dispatch = useDispatch();
    const languages: Language[] = useSelector((state: State) => selectAllLanguages(state));
    const fetching: boolean = useSelector((state: State) => state.languages.loading);
    const contentRange: string = useSelector((state: State) => state.languages.contentRange);

    return {
        languages,
        fetching,
        contentRange,
        fetchLanguages: (
            offset?: number,
            limit?: number,
            fields?: string[],
            filters?: {key: string; value: string | null}[],
            orders?: {key: string; value: string | null}[]
        ) => dispatch(fetchAllLanguages({offset, limit, fields, filters, orders}))
    };
};
