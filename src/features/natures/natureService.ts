import {Nature} from './natureType';

const fetchAll = async (offset?: number, limit?: number, fields?: string[], filters?: {key: string; value: string | null}[]): Promise<Nature[]> => {
    const urlFilters: string | undefined = filters?.reduce((acc, {key, value}) => `${acc}&${key}=${value}`, '');
    const urlFields: string | undefined = fields?.join(',');
    const response: Response = await fetch(
        `${process.env.REACT_APP_POSTGREST_API_BASE_URL}nature?select=${urlFields ?? ''}${offset ? `&offset=${offset}` : ''}${limit ? `&limit=${limit}` : ''}${
            urlFilters ?? ''
        }`,
        {
            method: 'GET'
        }
    );
    if (response.ok) {
        return (await response.json()) as Nature[];
    }
    return Promise.reject(new Error((await response.json()).message));
};

export default {
    fetchAll
};
