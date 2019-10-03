import {DataEntities} from './DataEntities';

export interface EntitiesResponse {
    timestamp: string;
    message: string;
    data: DataEntities;
    code: string;
}

