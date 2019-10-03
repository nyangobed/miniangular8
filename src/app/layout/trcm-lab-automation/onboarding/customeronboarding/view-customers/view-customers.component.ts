import { Component, OnInit } from '@angular/core';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { customer } from '../../Entities/customer-model';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { routerTransition } from '../../../../../router.animations';
import { OnboardingserviceService } from '../../onboardingservice.service';

@Component({
    selector: 'app-view-customers',
    templateUrl: './view-customers.component.html',
    styleUrls: ['./view-customers.component.scss'],
    animations: [routerTransition()]
})
export class ViewCustomersComponent implements OnInit {
    customers: customer;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(
        // private stewardServices: HttpStewardService<any, any>,
        private onboardingservices: OnboardingserviceService<any, any>,
        private notify: Notify, private route: ActivatedRoute) {
        this.customers = new customer();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchCustomers(params['id']);
            }
        });
    }

    fetchCustomers(id: number) {
        let params: Map<any, string> = new Map();
        let inst = this;
        // fetch customers make list
        this.onboardingservices.get('atlas/customers/' + id, params).subscribe((response) => {
            //(response);
            if (response.code == 200) {
                inst.customers = response.data;
                let order: number = 1;
                for (let data of inst.objectKeys(inst.customers)) {
                    if (inst.customers[data] != '') {
                        inst.viewparam.push({
                            value: inst.customers[data],
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
