import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {CreateRolesWrapper} from "../../../../entities/wrappers/create-roles-wrapper";
import {ViewParamBase} from "../../../../shared/base/viewParamBase";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute, Router} from "@angular/router";
import {Entity} from "../../../../entities/entity-model";
import { Location } from '@angular/common';
@Component({
    selector: 'app-viewroles',
    templateUrl: './viewroles.component.html',
    styleUrls: ['./viewroles.component.scss'],
    animations: [routerTransition()]
})
export class ViewrolesComponent implements OnInit {
    model: CreateRolesWrapper;
    viewparam: Array<ViewParamBase>;
    entity: Array<Entity>;

    constructor(private stewardService: HttpStewardService<any, any>, 
        private notify: Notify, 
        private route: ActivatedRoute,
         protected router: Router,
         private location: Location) {
        this.model = new CreateRolesWrapper();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchRoles(params['id']);
            }
        });
    }

    fetchRoles(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get('ufs-common-modules/api/v1/role/' + id, params).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;
                inst.viewparam.push({
                    value: inst.model.roleName,
                    label: "Role Name",
                    order: 1,
                });
                inst.viewparam.push({
                    value: inst.model.description,
                    label: "Description",
                    order: 2,
                });

                inst.viewparam.push({
                    value: new Date(inst.model.creationDate).toLocaleString(),
                    label: "Created:",
                    order: 3,
                });

                inst.loadRoles();
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    loadRoles() {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get('ufs-common-modules/api/v1/role/', params).subscribe((response) => {
            if (response.code == 200) {
                inst.entity = response.data.content;

                inst.entity.forEach(res => {
                    res.ufsEntityPermissionList.forEach(ec => {
                        ec.ufsRolePermissionMapSet.map(fnd => {
                            if (fnd.groupId.roleId == this.model.roleId) {
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
    goBack() {
        // window.history.back();
        this.location.back();
    
        // //( 'goBack()...' );
      }

}
