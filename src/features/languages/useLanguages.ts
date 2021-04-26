import {EntityId} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {State} from 'store';
import {PaginatedType} from '../../utils/paginatedType';
import {Language} from './languageType';
import {fetchAllLanguages, selectAllLanguages} from './languagesSlice';

export const useLanguages = (offset: number, limit: number, name: string) => {
    const dispatch = useDispatch();
    const languages: PaginatedType<Language> = useSelector((state: State) => selectAllLanguages(state, offset, limit, name));

    return {
        languages,
        fetchLanguages: () => dispatch(fetchAllLanguages(offset, limit, name))
    };
};
