import { Component, OnInit } from '@angular/core';
import { Parts } from '../entities/parts';
import { ViewParamBase } from '../../../../shared/base/viewParamBase';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';
import { Notify } from '../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../../router.animations';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-view-parts',
  templateUrl: './view-parts.component.html',
  styleUrls: ['./view-parts.component.scss'],
  animations: [routerTransition()]
})
export class ViewPartsComponent implements OnInit {
  parts: Parts;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(
        private stewardServices: HttpStewardService<any, any>,
      private notify: Notify, private route: ActivatedRoute) {
      this.parts = new Parts();
      this.viewparam = new Array();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          if (params['id'] != null) {
              this.fetchparts(params['id']);
          }
      });
  }

  fetchparts(id: number) {
      const params: Map<any, string> = new Map();
      const inst = this;
      // fetch devices make list
      this.stewardServices.get('atlas/parts/' + id, params).subscribe((response) => {
          //(response);
          if (response.code === 200) {
              inst.parts = response.data;
              let order = 1;
              for (const data of inst.objectKeys(inst.parts)) {
                  if (inst.parts[data] !== '') {
                      inst.viewparam.push({
                          value: inst.parts[data],
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
