import { Component, OnInit } from '@angular/core';
import { device } from '../../Entities/device-model';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../../../router.animations';
import { OnboardingserviceService } from '../../onboardingservice.service';

@Component({
    selector: 'app-view-devices',
    templateUrl: './view-devices.component.html',
    styleUrls: ['./view-devices.component.scss'],
    animations: [routerTransition()]
})
export class ViewDevicesComponent implements OnInit {
    devices: device;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;

    constructor(
        //   private stewardServices: HttpStewardService<any, any>,
        private onboardingservices: OnboardingserviceService<any, any>,
        private notify: Notify, private route: ActivatedRoute) {
        this.devices = new device();
        this.viewparam = new Array();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.fetchdevices(params['id']);
            }
        });
    }

    fetchdevices(id: number) {
        const params: Map<any, string> = new Map();
        const inst = this;
        // fetch devices make list
        this.onboardingservices.get('atlas/devices/' + id, params).subscribe((response) => {
            //(response);
            if (response.code === 200) {
                inst.devices = response.data;
                let order = 1;
                for (const data of inst.objectKeys(inst.devices)) {
                    if (inst.devices[data] !== '') {
                        inst.viewparam.push({
                            value: inst.devices[data],
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
