import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Department} from "../../../../entities/department-model";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute} from "@angular/router";
import {ViewParamBase} from "../../../../shared/base/viewParamBase";

@Component({
    selector: 'app-viewdepartment',
    templateUrl: './viewdepartment.component.html',
    styleUrls: ['./viewdepartment.component.scss'],
    animations: [routerTransition()]
})
export class ViewdepartmentComponent implements OnInit {
    model: Department;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new Department();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.department(params['id']);
            }
        });
    }

    department(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("departments/" + id, params).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;
                let order: number = 1;
                for (let data of inst.objectKeys(inst.model)) {
                    if (inst.model[data] != '') {
                        inst.viewparam.push({
                            value: inst.model[data],
                            label: data.toLowerCase(),
                            order: order,
                        });
                    }
                    order++;
                }

            } else {
                inst.notify.showWarning(response.message);
            }
        });

    }

}
