import {EntityPermission} from "./entity-permission-model";

export class Entity {
    module: string;
    ufsEntityPermissionList: EntityPermission[]
    entityId: number;
    entityName: string;
   
}