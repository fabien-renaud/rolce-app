import {EntityId} from '@reduxjs/toolkit';
import {Contract} from './contractType';

const fetchById = async (reference: EntityId): Promise<Contract | null> => {
    const response: Response = await fetch(`${process.env.REACT_APP_POSTGREST_API_BASE_URL}contract?select=*,account(name)&reference=eq.${reference}`, {
        method: 'GET'
    });
    const responseValue = await response.json();
    return response.ok ? (responseValue[0] as Contract) : Promise.reject(new Error(responseValue.message));
};

export default {
    fetchById
};
