import {Component, OnInit} from '@angular/core';
import {CreateBusinessUnitWrapper} from "../../../../entities/wrappers/create-business-wrapper";
import {routerTransition} from "../../../../router.animations";
import {ViewParamBase} from "../../../../shared/base/viewParamBase";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-viewbusinessunit',
    templateUrl: './viewbusinessunit.component.html',
    styleUrls: ['./viewbusinessunit.component.scss'],
    animations: [routerTransition()]
})
export class ViewbusinessunitComponent implements OnInit {
    isUpdate = false;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;
    model: CreateBusinessUnitWrapper;
    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new CreateBusinessUnitWrapper();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.getBusinessUnit(params['id']);
            }
        });
    }

    getBusinessUnit(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("business-units/" + id, params).subscribe((response) => {
            //(response);
            if (response.code == 200) {
                inst.model = response.data;
                let order: number = 1;
                for (let data of inst.objectKeys(inst.model)) {
                    if (inst.model[data] != '' && (typeof inst.model[data]) != 'object') {
                        inst.viewparam.push({
                            value: inst.model[data],
                            label: data.toLowerCase(),
                            order: order,
                        });
                    }
                    order++;
                }
                inst.viewparam.push({
                    value: inst.model.productId.productName,
                    label: "Product Name",
                    order: 2,
                });

            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

}
