export type FetchAllParameters = {
    offset?: number;
    limit?: number;
    fields?: string[];
    filters?: {key: string; value: string | null}[];
    orders?: {key: string; value: string | null}[];
};

export const fetchAll = async <T>(
    collection: string,
    {offset, limit, fields, filters, orders}: FetchAllParameters
): Promise<{datas: T[]; contentRange: string}> => {
    const urlFilters: string | undefined = filters?.reduce((acc, {key, value}) => `${acc}&${key}=${value}`, '');
    const urlOrders: string | undefined = orders?.reduce((acc, {key, value}) => `${acc}${key}.${value},`, '&order=').slice(0, -1);
    const urlFields: string | undefined = fields?.join(',');
    const response: Response = await fetch(
        `${process.env.REACT_APP_POSTGREST_API_BASE_URL}${collection}?select=${urlFields ?? ''}${offset ? `&offset=${offset}` : ''}${
            limit ? `&limit=${limit}` : ''
        }${urlFilters ?? ''}${urlOrders ?? ''}`,
        {
            method: 'GET',
            headers: {Prefer: 'count=exact'}
        }
    );
    if (response.ok) {
        return {
            datas: (await response.json()) as T[],
            contentRange: response.headers.get('Content-Range') ?? ''
        };
    }
    return Promise.reject(new Error((await response.json()).message));
};
