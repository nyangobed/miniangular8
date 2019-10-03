import {Entities} from './Entities';

export interface Data {
    content: Entities[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: boolean;
    first: number;
    numberOfElements: number;
    size: number;
    number: number;
}

