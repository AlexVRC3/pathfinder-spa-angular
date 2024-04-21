export const MINIMUN_FILTER: number = 200;

export interface Filter {
    search: string;
    distance: number;
}

export const INIT_FILTER_EMPTY : Filter = {
    search: '',
    distance: MINIMUN_FILTER
}