import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {Department} from "../../../../entities/department-model";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-createdepartment',
    templateUrl: './createdepartment.component.html',
    styleUrls: ['./createdepartment.component.scss'],
    animations: [routerTransition()]
})
export class CreatedepartmentComponent implements OnInit {
    model: Department;
    public isUpdate: boolean = false;


    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new Department();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.department(params['id']);
            }
        });
    }

    department(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("departments/" + id, params).subscribe((response) => {
            //(response);
            if (response.code == 200) {
                inst.model = response.data;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });

    }

    onSaveDepartment(form: NgForm) {
        let inst = this;
        if (this.isUpdate) {
            this.stewardService.put("departments", this.model).subscribe((response) => {
                //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                } else {
                    inst.notify.showWarning(response.message);
                }
                form.resetForm();
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.post("departments", this.model).subscribe((response) => {
                //(response);
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                } else {
                    inst.notify.showWarning(response.message);
                }
                form.resetForm();
            }, error => {
                //(error);
            });
        }
    }

}
