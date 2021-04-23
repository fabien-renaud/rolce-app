import {Activity} from '../activities';

export type Nature = {
    id: string;
    label: string;
    parent: Nature;
    activity: Activity;
};
