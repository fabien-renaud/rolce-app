import {EntityId} from '@reduxjs/toolkit';
import {Contract} from './contractType';
import contracts from './contracts.json';

const fetchById = async (reference: EntityId): Promise<Contract | null> =>
    new Promise<Contract | null>((resolve) => resolve(contracts.filter((contract: Contract) => contract.reference === reference)[0]));

export default {
    fetchById
};
