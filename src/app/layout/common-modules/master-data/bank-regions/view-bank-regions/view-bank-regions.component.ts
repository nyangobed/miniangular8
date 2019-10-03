import { BankRegions } from './../../../../../entities/bank-regions-model';
import {Component, OnInit} from '@angular/core';
import {Currency} from '../../../../../entities/currency-model';
import {ViewParamBase} from '../../../../../shared/base/viewParamBase';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';

@Component({
    selector: 'app-view-bank-regions',
    templateUrl: './view-bank-regions.component.html',
    styleUrls: ['./view-bank-regions.component.scss'],
    animations: [routerTransition()]
})
export class ViewBankRegionsComponent implements OnInit {
    model: BankRegions;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new BankRegions();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchBankRegion(params['id']);
            }
        });
    }

    fetchBankRegion(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        // fetch device make list
        this.stewardService.get('atlas/bank_regions/' + id, params).subscribe((response) => {
            // //(response);
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
