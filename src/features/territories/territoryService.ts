import {Territory} from './territoryType';

const fetchAll = async (offset?: number, limit?: number, fields?: string[], filters?: {key: string; value: string}[]): Promise<Territory[]> => {
    const urlFilters: string | undefined = filters?.reduce((acc, {key, value}) => `${acc}&${key}=${value}`, '');
    const urlFields: string | undefined = fields?.join(',');
    const response: Response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}territories?fields=${urlFields ?? ''}&offset=${offset ?? ''}&limit=${limit ?? ''}${urlFilters ?? ''}`,
        {
            method: 'GET'
        }
    );
    if (response.ok) {
        return (await response.json()) as Territory[];
    }
    return Promise.reject(new Error((await response.json()).message));
};

export default {
    fetchAll
};
