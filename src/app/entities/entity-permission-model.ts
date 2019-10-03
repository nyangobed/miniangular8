import {RolePermissionMap} from "./role-permission-map-model";

export class EntityPermission {
    caption: string;
    permission: string;
    permissionId: number;
    ufsRolePermissionMapSet: RolePermissionMap[]
    checked: boolean;
  
}


