import {Territory} from './territoryType';

const fetchAll = async (offset?: number, limit?: number, name?: string): Promise<Territory[]> => {
    const response: Response = await fetch(`${process.env.REACT_APP_BASE_URL}territories?offset=${offset}&limit=${limit}&name=${name}`, {
        method: 'GET'
    });
    if (response.ok) {
        return (await response.json()) as Territory[];
    }
    return Promise.reject(new Error((await response.json()).message));
};

export default {
    fetchAll
};
