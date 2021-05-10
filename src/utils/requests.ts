export type FetchAllParameters = {
    offset?: number;
    limit?: number;
    fields?: string[];
    filters?: {key: string; value: string | null}[];
    orders?: {key: string; value: string | null}[];
};
