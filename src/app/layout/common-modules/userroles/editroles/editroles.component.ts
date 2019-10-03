import {Component, OnInit, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {routerTransition} from "../../../../router.animations";
import {Roles} from "../../../../entities/roles-modules";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateRolesWrapper} from "../../../../entities/wrappers/create-roles-wrapper";
import {Entity} from "../../../../entities/entity-model";
import {RolesWrapper} from "../../../../entities/wrappers/roles-wrapper";

@Component({
    selector: 'app-editroles',
    templateUrl: './editroles.component.html',
    styleUrls: ['./editroles.component.scss'],
    animations: [routerTransition()]
})
export class EditrolesComponent implements OnInit {

    model: CreateRolesWrapper;
    rolePermissions: Array<number>;

    rolesWrapper: RolesWrapper;


    groupName: string;
    roledesc: string;
    roleId: number;

    activated: boolean = false;
    ids: Array<number>;
    closeResult: string;

    entity: Array<Entity>;
    id: any;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute, protected router: Router) {
        this.model = new CreateRolesWrapper();
        this.entity = new Array();
        this.rolePermissions = new Array();
        this.ids = new Array();
        this.rolesWrapper = new RolesWrapper();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchErrorCodes(params['id']);
            }
        });
        // this.route.params.subscribe(params => {
        //     if (params['id'] != null) {
        //       this.stewardService.get('ufs-common-modules/api/v1/role/' + params['id']).subscribe((editDevices) => {
        //         this.id = params['id'];
        //         this.model = editDevices.data;
        //         ////('this device model', this.model);
        
        //         this.model.get('roleName').setValue(editDevices.data.roleName);
               
        //         this.model.get('description').setValue(editDevices.data.description);
                
        //       });
        
        //     }
        
        //   });
    }

    ngAfterViewInit() {
        this.entity.forEach(res => {
            res.ufsEntityPermissionList.forEach(ec => {
                ec.ufsRolePermissionMapSet.map(fnd => {
                    if (fnd.groupId.groupId == this.model.roleId) {
                        ec.checked = true;
                    }
                });
            });
        });
    }


    fetchErrorCodes(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get('api/v1/role/' + id, params).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;
                inst.loadRoles();
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    loadRoles() {
        let params: Map<any, string> = new Map();
        let inst = this;
        this.stewardService.get('api/v1/role/', params).subscribe((response) => {
            if (response.code == 200) {
                inst.entity = response.data.content;

                inst.entity.forEach(res => {
                    res.ufsEntityPermissionList.forEach(ec => {
                        ec.ufsRolePermissionMapSet.map(fnd => {
                            if (fnd.groupId.groupId == this.model.roleId) {
                                ec.checked = true;
                            }
                        });
                    });
                });

            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    updateRoles() {
        this.entity.forEach(res => {
            res.ufsEntityPermissionList.forEach(ec => {
                if (ec.checked) {
                    this.rolePermissions.push(ec.permissionId);
                }
            });
        });

        this.rolesWrapper.roleId = this.model.roleId;
        this.rolesWrapper.roleName = this.model.roleName;
        this.rolesWrapper.description = this.model.description;
        this.rolesWrapper.rolePermissions = this.rolePermissions;

        let inst = this;
        this.stewardService.put('ufs-common-modules/api/v1/role', this.rolesWrapper).subscribe((response) => {
            console.log(response);
            if (response.code == 200) {
                inst.notify.showSuccess(response.message);
            } else {
                inst.notify.showWarning(response.message);
            }
        }, error => {
            // //(error);
        });

    }

}
