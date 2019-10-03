import {RoleMaps} from '../role-maps-model';
import {Department} from '../department-model';

// export class CreateUserWrapper {
//     userId: number;
//     fullName: string;
//     msisdn: string;
//     emailAddress: string;
//     roleIds: number[];
//     userType: string;
//     documentType: string;
//     documentNumber: string;
//     status: string;
//     roleMaps: Array<RoleMaps>;
//     departmentId: Department;
//     passwordStatus: string;

// }


export class CreateUserWrapper {
    userId: number;
    fullName: string;
    phoneNumber: string;
    email: string;
     userType: string;
    userTypeId: number;
    documentType: string;
    documentNumber: string;
    status: string;
    roleMaps: Array<RoleMaps>;
    departmentId: Department;
    departmentIds: Number;
    passwordStatus: string;
    genderId: number;
    workgroupIds: number[];
    groupId:  number[];
    tenantIds: number;
    }
