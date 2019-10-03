import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { routerTransition } from "../../../../router.animations";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Notify } from "../../../../shared/classes/notify";
import { Roles } from "../../../../entities/roles-modules";
import { CreateUserWrapper } from "../../../../entities/wrappers/create-user-wrapper";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
    FormGroup,
    NgForm,
    FormControl,
    FormGroupDirective,
    Validators
} from "@angular/forms";
import { CheckerActions } from "../../../../entities/wrappers/checker-actions";
import { MyErrorStateMatcher } from "../../../../shared/classes/error-state-handler";
import { PasswordReset } from "../../../../entities/wrappers/reset-password-wrapper";
import { Department } from "../../../../entities/department-model";
import { MatDialog } from "@angular/material";
// import {CheckerDialogComponent} from '../../../checker-dialog/checker-dialog.component';
import { EditDialogComponent } from "./edit-dialog/edit-dialog.component";
import { Location } from "@angular/common";
@Component({
    selector: "app-createuser",
    templateUrl: "./createuser.component.html",
    styleUrls: ["./createuser.component.scss"],
    animations: [routerTransition()]
})
export class CreateuserComponent implements OnInit {
    model: CreateUserWrapper;
    reset: PasswordReset;
    departs: any = {};
    departments: Array<Department>;

    systemRoles: Roles[];
    roles: number[] = [];
    workgroups: number[] = [];

    firstName: string;
    lastName: string;

    public isUpdate = false;
    formGroup: FormGroup;
    modal: NgbModalRef;
    checkerActions: CheckerActions<any>;

    lockLabel = "Lock";
    unlockLabel = "Unlock";
    activateLabel = "Activate";
    deactivateLabel = "Deactivate";
    // resetLabel = 'Reset Password';
    gender = [];
    userType = [];

    createFormControl = new FormControl("", [
        Validators.required,
        Validators.email
    ]);

    matcher = new MyErrorStateMatcher();

    form: FormGroup;

    constructor(
        public dialog: MatDialog,
        private stewardService: HttpStewardService<any, any>,
        private notify: Notify,
        private route: ActivatedRoute,
        protected router: Router,
        protected modalService: NgbModal,
        private location: Location
    ) {
        this.model = new CreateUserWrapper();
        this.checkerActions = new CheckerActions();
        this.checkerActions.action = "approve";
        this.reset = new PasswordReset();
        this.departments = [];
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set("actionStatus", "Approved");
        this.stewardService
            .get("ufs-common-modules/api/v1/workgroup", params)
            .subscribe(response => {
                if (response.code === 200) {
                    inst.systemRoles = response.data.content;
                    //('TESTING AS MUCH:  ',inst.systemRoles[0])
                } else {
                    inst.notify.showWarning(response.message);
                }
            });

        this.stewardService
            .get("ufs-common-modules/api/v1/gender")
            .subscribe(response => {
                if (response.code === 200) {
                    inst.gender = response.data.content;
                } else {
                    inst.notify.showWarning(response.message);
                }
            });

        this.stewardService
            .get("ufs-common-modules/api/v1/user-types")
            .subscribe(response => {
                if (response.code === 200) {
                    inst.userType = response.data.content;
                } else {
                    inst.notify.showWarning(response.message);
                }
            });

        this.route.params.subscribe(params => {
            if (params["id"] != null) {
                this.isUpdate = true;
                this.fetchUser(params["id"]);
            }
        });

        this.formGroup = new FormGroup({
            action: new FormControl()
        });
    }

    fetchUser(id: number) {
        const params: Map<any, string> = new Map();
        const inst = this;

        this.stewardService
            .get("ufs-common-modules/api/v1/user/" + id, params)
            .subscribe(response => {
                if (response.code === 200) {
                    //(response);
                    inst.model = response.data;
                    const x = response.data.fullName.split(" ");
                    inst.firstName = x[0];
                    inst.lastName = x[1];
                } else {
                    this.isUpdate = false;
                    inst.notify.showWarning(response.message);
                }
            });

        this.stewardService
            .get("ufs-common-modules/api/v1/user/workgroups/" + id, params)
            .subscribe(response => {
                // console.log(response);
                if (response.code === 200) {
                    const data = response.data;
                    data.forEach(workgroup => {
                        this.systemRoles.map(mp => {
                            if (mp.groupId === workgroup.groupId) {
                                mp.checked = true;
                            }
                        });
                    });
                } else {
                    this.isUpdate = false;
                    inst.notify.showWarning(response.message);
                }
            });
    }

    onCreateUser(form: NgForm) {
        this.systemRoles.forEach(res => {
            if (res.checked) {
                this.workgroups.push(res.groupId);
            }
        });
        this.model.workgroupIds = this.workgroups;
        this.model.fullName = this.firstName + " " + this.lastName;

        const d: number = this.departs;

        const dpt = this.departments.filter(
            x => x.departmentId == this.departs
        )[0];
        this.model.departmentId = dpt;
        this.model.tenantIds = 1;
        this.model.departmentIds = 1;
        // console.log("MODEL", this.model);

        const inst = this;

        if (this.model.workgroupIds.length < 1) {
            inst.notify.showWarning("You havent selected any roles yet");
        } else {
            if (this.isUpdate) {
                this.stewardService
                    .put("ufs-common-modules/api/v1/user", this.model)
                    .subscribe(
                        response => {
                            //(response);
                            if (response.code === 201 || response.code === 200) {
                                inst.notify.showSuccess(response.message);
                                form.resetForm();
                                this.router.navigate([
                                    "common-modules/systemusers/listusers"
                                ]);
                            } else {
                                inst.notify.showWarning(response.message);
                            }
                        },
                        error => {
                            //(error);
                            inst.notify.showWarning(error.error.message);
                        }
                    );
            } else {
                this.stewardService
                    .post("ufs-common-modules/api/v1/user", this.model)
                    .subscribe(
                        response => {
                            //(response);
                            if (response.code === 201) {
                                inst.notify.showSuccess(response.message);
                                form.resetForm();
                                this.router.navigate([
                                    "common-modules/systemusers/listusers"
                                ]);
                            } else {
                                inst.notify.showWarning(response.message);
                            }
                        },
                        error => {
                            //(error);
                            inst.notify.showWarning(error.error.message);
                        }
                    );
            }
        }
    }

    resetForm(form: NgForm): void {
        form.resetForm();
    }

    approve(form: NgForm) {
        const ids: Array<any> = new Array();
        ids.push(this.model.userId);

        this.checkerActions.ids = ids;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = "";
        }
        if (this.checkerActions.action == "Reset Password") {
            this.reset.email = this.model.email;
            this.stewardService
                .postFormData("users/forgot-password", this.reset)
                .subscribe(response => {
                    //(response);
                    if (response.code === 200) {
                        this.modal.close();
                        this.notify.showSuccess(response.message);
                        $($.fn.dataTable.tables(true))
                            .DataTable()
                            .ajax.reload(null, false);
                        form.resetForm();
                    } else {
                        this.notify.showWarning(response.message);
                    }
                });
        } else {
            this.stewardService
                .put(
                    "ufs-common-modules/api/v1/user/" +
                        this.checkerActions.action.toLowerCase(),
                    this.checkerActions
                )
                .subscribe(response => {
                    //(response);
                    if (response.code === 200) {
                        this.modal.close();
                        this.notify.showSuccess(response.message);
                        $($.fn.dataTable.tables(true))
                            .DataTable()
                            .ajax.reload(null, false);
                        form.resetForm();
                    } else {
                        this.notify.showWarning(response.message);
                    }
                });
        }
    }

    open(content: any, action: string) {
        this.checkerActions.action = action;

        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: "500px",
            data: {
                checkerActions: this.checkerActions,
                lockLabel: this.lockLabel,
                unlockLabel: this.unlockLabel,
                activateLabel: this.activateLabel,
                deactivateLabel: this.deactivateLabel,

                model: this.model,
                formGroup: this.formGroup
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }
    goBack() {
        this.location.back();
    }
}
