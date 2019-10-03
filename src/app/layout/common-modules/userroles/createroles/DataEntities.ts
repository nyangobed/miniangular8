import {EntityPermission} from './EntityPermission';

export interface DataEntities {
    content: EntityPermission[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    sort: boolean;
    first: number;
    numberOfElements: number;
    size: number;
    number: number;
}

