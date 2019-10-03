import { Component, OnInit } from '@angular/core';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { order } from '../../../onboarding/Entities/orders-model';
import { OnboardingserviceService } from '../../../onboarding/onboardingservice.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../../../router.animations';

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.component.html',
  styleUrls: ['./vieworders.component.scss'],
  animations: [routerTransition()]
})
export class ViewordersComponent implements OnInit {
  orders: order;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(
      //   private stewardServices: HttpStewardService<any, any>,
      private onboardingservices: OnboardingserviceService<any, any>,
      private notify: Notify, private route: ActivatedRoute) {
      this.orders = new order();
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
      this.onboardingservices.get('atlas/orders/' + id, params).subscribe((response) => {
          //(response);
          if (response.code === 200) {
              inst.orders = response.data;
              // tslint:disable-next-line:no-shadowed-variable
              let order = 1;
              for (const data of inst.objectKeys(inst.orders)) {
                  if (inst.orders[data] !== '') {
                      inst.viewparam.push({
                          value: inst.orders[data],
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
