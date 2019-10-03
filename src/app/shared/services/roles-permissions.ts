import {Injectable} from '@angular/core';
import {ResponseWrapper} from '../../entities/wrappers/response-wrapper';

@Injectable()
export class UserRolesPermissions {
    roles: Array<string>;
    userData: ResponseWrapper<any>;
    constructor() {
        this.roles = new Array();
        this.userData = JSON.parse(localStorage.getItem('userData'));
    }

    userPermissions(): Array<string> {
        const inst = this;
        this.userData.data.permissions.forEach(res => {
            inst.roles.push(res);
        });
        return this.roles;
    }



}

