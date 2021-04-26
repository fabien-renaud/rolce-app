import {Language} from './languageType';
import languages from './languages.json';
import {PaginatedType} from '../../utils/paginatedType';

const fetchAll = async (offset: number, limit: number, name: string): Promise<PaginatedType<Language> | null> =>
    new Promise<PaginatedType<Language> | null>((resolve) => {
        const data = languages
            .filter((language: Language) => language.value.includes(name))
            .map((language: Language) => ({
                id: language.id,
                value: language.value
            }));
        const count = data.length;
        resolve({
            data: data.slice(offset, limit),
            count
        });
    });

export default {
    fetchAll
};
