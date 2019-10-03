import {Component, OnInit} from '@angular/core';
import {ViewParamBase} from "../../../../shared/base/viewParamBase";
import {routerTransition} from "../../../../router.animations";
import {Product} from "../../../../entities/product-model";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-viewproduct',
    templateUrl: './viewproduct.component.html',
    styleUrls: ['./viewproduct.component.scss'],
    animations: [routerTransition()]
})
export class ViewproductComponent implements OnInit {
    model: Product;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;


    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new Product();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchProduct(params['id']);
            }
        });
    }

    fetchProduct(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        //fetch device make list
        this.stewardService.get("products/" + id, params).subscribe((response) => {
            //(response);
            if (response.code == 200) {
                inst.model = response.data;
                let order: number = 1;
                for (let data of inst.objectKeys(inst.model)) {
                    if (inst.model[data] !== '') {
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
