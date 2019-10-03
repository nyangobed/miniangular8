import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {CreateBusinessUnitWrapper} from "../../../../entities/wrappers/create-business-wrapper";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {Product} from "../../../../entities/product-model";
import {ViewParamBase} from "../../../../shared/base/viewParamBase";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-createbusinessunit',
    templateUrl: './createbusinessunit.component.html',
    styleUrls: ['./createbusinessunit.component.scss'],
    animations: [routerTransition()]
})
export class CreatebusinessunitComponent implements OnInit {
    products: Array<Product>;
    model: CreateBusinessUnitWrapper;
    selectedValue: number;


    step2: any = {
        showNext: true,
        showPrev: true
    };

    step3: any = {
        showSecret: false
    };

    isCompleted: boolean = false;

    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;



    public isUpdate: boolean = false;


    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new CreateBusinessUnitWrapper();
        this.products = new Array();
        this.viewparam = new Array();
    }

    ngOnInit() {
        let params: Map<any, string> = new Map();
        let inst = this;
        params.set("actionStatus", "Approved");
        params.set("sort", "productId,desc");
        //fetch device make list
        this.stewardService.get("products", params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
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
                inst.selectedValue = inst.model.productId.productId;

            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }

    onStep1Next(event) {
        //('Step1 - Next');
    }

    onStep2Next(event) {
        const prodct = this.products.filter(x => x.productId == this.selectedValue)[0];
        this.model.productId = prodct;

        this.viewparam.push({
            value: this.model.unitName,
            label: "Unit Name",
            order: 1,
        });
        this.viewparam.push({
            value: this.model.productId.productName,
            label: "Product Name",
            order: 2,
        });
    }

    onStep3Next(event) {
        //('Step3 - Next');
    }

    onComplete(event) {
        let inst = this;

        if (this.isUpdate) {
            this.stewardService.put("business-units", this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            this.stewardService.post("business-units", this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }

    }
    onStepChanged(step) {
        //('Changed to ' + step.title);
    }

}
