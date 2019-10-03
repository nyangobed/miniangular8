import {Data} from './Data';

export interface UserResponse {
    timestamp: string;
    message: string;
    data: Data;
    code: string;
}

