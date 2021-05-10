import {Activity} from '../activities';

export type Nature = {
    id: string;
    label: string;
    parentId: string;
    activity: Activity;
};
