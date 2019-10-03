import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { routerTransition } from "../../../../router.animations";
import { Entities } from "./Entities";
import { UserResponse } from "./UserResponse";
import { EntitiesResponse } from "./EntitiesResponse";
import { PostRoles } from "./PostRoles";
import { GlobalParams } from "../../../../shared/services/globalparams";
import { Notify } from "../../../../shared/classes/notify";
import { NgForm } from "@angular/forms";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Meta } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: "app-createroles",
    templateUrl: "./createroles.component.html",
    styleUrls: ["./createroles.component.scss"],
    animations: [routerTransition()]
})
export class CreaterolesComponent implements OnInit {
    entities: Entities[];
    entss: Entities[] = [];
    model: any = {};
    permissions: number[] = [];
    postRoles: PostRoles;
    public isUpdate: boolean = false;
    constructor(
        private stewardService: HttpStewardService<any, any>,
        private globalParam: GlobalParams,
        private notify: Notify,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        const that = this;
        this.stewardService
            .get("ufs-common-modules/api/v1/entity")
            .subscribe(resp => {
                // //('entity resp', resp);
                that.entities = resp.data.content;
            });
        this.route.params.subscribe(params => {
            if (params["id"] != null) {
                this.isUpdate = true;
                this.fetchRoles(params["id"]);
            }
        });
    }
    fetchRoles(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService
            .get("ufs-common-modules/api/v1/role/" + id, params)
            .subscribe(response => {
                // //(response);
                if (response.code == 200) {
                    inst.model = response.data;
                } else {
                    this.isUpdate = false;
                    inst.notify.showWarning(response.message);
                }
            });
    }

    addRoles(rolesForm: NgForm) {
        // //('entss', this.entities);
        this.entities.forEach(res => {
            res.ufsEntityPermissionList.forEach(ich => {
                if (ich.checked) {
                    this.permissions.push(ich.entityPermissionId);
                    // console.log('checked', this.permissions);
                }
            });
        });

        const pos: PostRoles = {
            roleName: this.model.roleName,
            description: this.model.description,
            rolePermissions: this.model.rolePermissions,
            permissions: this.permissions,
            get: this.model.get
        };
        this.model.workgroupRolesIds = this.permissions;
        let inst = this;
        if (this.model.workgroupRolesIds.length < 1) {
            inst.notify.showWarning(
                "You havent selected any type permission yet"
            );
        } else {
            if (this.isUpdate) {
                this.stewardService
                    .put("ufs-common-modules/api/v1/role", this.model)
                    .subscribe(
                        response => {
                            //(response);
                            if (response.code === 200) {
                                inst.notify.showSuccess(response.message);
                                rolesForm.resetForm();
                                inst.router.navigate([
                                    "/common-modules/workgroups"
                                ]);
                            } else {
                                inst.notify.showWarning(response.message);
                            }
                        },
                        error => {
                            //(error);
                        }
                    );
            } else {
                const that = this;
                this.stewardService
                    .post("ufs-common-modules/api/v1/role", pos)
                    .subscribe(
                        res => {
                            // console.log('permissions', this.permissions);
                            if (res.code === 201) {
                                that.notify.showSuccess(res.message);
                                rolesForm.resetForm();
                                that.router.navigate([
                                    "/common-modules/userroles"
                                ]);
                            } else {
                                that.notify.showWarning(res.message);
                            }
                        },
                        error => {
                            that.notify.showWarning(error.error.message);
                        }
                    );
            }
        }
    }
    goBack() {
        // window.history.back();
        this.location.back();

        //( 'goBack()...' );
    }
}
