import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { PendingOrders } from '../../../../../entities/pending-orders';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { OnboardingserviceService } from '../../../onboarding/onboardingservice.service';
import { ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';

@Component({
  selector: 'app-view-pending-orders',
  templateUrl: './view-pending-orders.component.html',
  styleUrls: ['./view-pending-orders.component.scss'],
  animations: [routerTransition()]
})
export class ViewPendingOrdersComponent implements OnInit {
  orders: PendingOrders;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(
      //   private stewardServices: HttpStewardService<any, any>,
      private onboardingservices: OnboardingserviceService<any, any>,
      private notify: Notify, private route: ActivatedRoute) {
      this.orders = new  PendingOrders();
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
      this.onboardingservices.get('atlas/ordersReceivedd/' + id, params).subscribe((response) => {
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