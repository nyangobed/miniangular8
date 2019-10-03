import { Component, OnInit } from '@angular/core';
import { OnboardingserviceService } from '../../onboardingservice.service';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';

import { ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { routerTransition } from '../../../../../router.animations';
import { DeviceModel } from '../../Entities/devicetype';

@Component({
  selector: 'app-view-devicemodels',
  templateUrl: './view-devicemodels.component.html',
  styleUrls: ['./view-devicemodels.component.scss'],
  animations: [routerTransition()]
})
export class ViewDevicemodelsComponent implements OnInit {
  devices: DeviceModel;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(
      // private stewardServices: HttpStewardService<any, any>,
      private onboardingservices: OnboardingserviceService<any, any>,
      private notify: Notify, private route: ActivatedRoute) {
      this.devices = new DeviceModel();
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
      this.onboardingservices.get('atlas/deviceModel/' + id, params).subscribe((response) => {
          //(response);
          if (response.code == 200) {
              inst.devices = response.data;
              let order: number = 1;
              for (let data of inst.objectKeys(inst.devices)) {
                  if (inst.devices[data] != '') {
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
