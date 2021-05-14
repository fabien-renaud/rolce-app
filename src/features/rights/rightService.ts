import {RightDto} from './rightType';

export const createRight = async (rightDto: RightDto): Promise<string[]> => {
    const response: Response = await fetch(`${process.env.REACT_APP_API_BASE_URL}rights`, {
        method: 'POST',
        body: JSON.stringify(rightDto),
        headers: new Headers({'Content-Type': 'application/json'})
    });
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(new Error((await response.json()).message));
};
