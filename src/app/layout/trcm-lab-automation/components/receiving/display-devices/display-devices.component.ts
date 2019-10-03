import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { RepairClass } from '../../../models/repair/repair';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-display-devices',
  templateUrl: './display-devices.component.html',
  styleUrls: ['./display-devices.component.scss'],
  animations: [routerTransition()]
})
export class DisplayDevicesComponent implements OnInit {

  received: RepairClass;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.values;

  constructor(private activatedRoute: ActivatedRoute, private notify: Notify, private httpStewardService: HttpStewardService<any, any>) {
    this.viewparam = new Array();
      this.received = new RepairClass();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== null) {
        this.fetchReceived(params['id']);
      }
    });
  }

  fetchReceived(id: number) {
    const params: Map<any, string> = new Map();
    const inst = this;

    this.httpStewardService.get('atlas/repair/' + id, params).subscribe((response) => {
      if (response.code === 200) {
        inst.received = response.data;
        let order = 1;
        for (const data of inst.objectKeys(inst.received)) {
          if (inst.received[data] !== '') {
            inst.viewparam.push({
              value: JSON.stringify(inst.received[data], null, 2),
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
