import {Artwork} from './artworkType';

const fetchAll = async (
    offset?: number,
    limit?: number,
    fields?: string[],
    filters?: {key: string; value: string | null}[],
    orders?: {key: string; value: string | null}[]
): Promise<{artworks: Artwork[]; contentRange: string}> => {
    const urlFilters: string | undefined = filters?.reduce((acc, {key, value}) => `${acc}&${key}=${value}`, '');
    const urlOrders: string | undefined = orders?.reduce((acc, {key, value}) => `${acc}${key}.${value},`, '&order=').slice(0, -1);
    const urlFields: string | undefined = fields?.join(',');
    const response: Response = await fetch(
        `${process.env.REACT_APP_POSTGREST_API_BASE_URL}artwork?select=${urlFields ?? ''}${offset ? `&offset=${offset}` : ''}${limit ? `&limit=${limit}` : ''}${
            urlFilters ?? ''
        }${urlOrders ?? ''}`,
        {
            method: 'GET',
            headers: {Prefer: 'count=exact'}
        }
    );
    if (response.ok) {
        return {
            artworks: (await response.json()) as Artwork[],
            contentRange: response.headers.get('Content-Range') ?? ''
        };
    }
    return Promise.reject(new Error((await response.json()).message));
};

export default {
    fetchAll
};
