import { Component, OnInit } from '@angular/core';
import { manufacturer } from '../../Entities/manufacturer-model';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../../../router.animations';
import { OnboardingserviceService } from '../../onboardingservice.service';

@Component({
  selector: 'app-view-manufacturers',
  templateUrl: './view-manufacturers.component.html',
  styleUrls: ['./view-manufacturers.component.scss'],
  animations: [routerTransition()]
})
export class ViewManufacturersComponent implements OnInit {
  manufacturers: manufacturer;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(
    //   private stewardServices: HttpStewardService<any, any>,
    private onboardingservices: OnboardingserviceService<any, any>,
     private notify: Notify, private route: ActivatedRoute) {
      this.manufacturers = new manufacturer();
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
      this.onboardingservices.get('atlas/manufacturers/' + id, params).subscribe((response) => {
          //(response);
          if (response.code == 200) {
              inst.manufacturers = response.data;
              let order: number = 1;
              for (let data of inst.objectKeys(inst.manufacturers)) {
                  if (inst.manufacturers[data] != '') {
                      inst.viewparam.push({
                          value: inst.manufacturers[data],
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
