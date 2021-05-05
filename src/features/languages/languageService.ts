import {Language} from './languageType';
import languages from './languages.json';

const fetchAll = async (offset: number, limit: number, name: any): Promise<Language[]> =>
    new Promise<Language[]>((resolve) => {
        const data = languages
            .filter((language: Language) => (name ? language.value.includes(name) : true))
            .map((language: Language) => ({
                id: language.id,
                value: language.value
            }));
        resolve(data.slice(offset, limit));
    });

export default {
    fetchAll
};
