import {EntityPermission} from './EntityPermission';

export interface Entities {
    entityId: number;
    entityName: string;
    module: string;
    permission: EntityPermission[];
    checked: boolean;
    ufsEntityPermissionList: EntityPermission[];
    
}


