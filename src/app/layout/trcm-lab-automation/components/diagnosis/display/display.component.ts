import { Component, OnInit } from '@angular/core';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { routerTransition } from '../../../../../router.animations';
import { RepairClass, Repair } from '../../../models/repair/repair';
import { Devices } from '../../../models/repair/devices';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  animations: [routerTransition()]
})
export class DisplayComponent implements OnInit {

  repair: RepairClass;
  devices: Devices;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(private activatedRoute: ActivatedRoute, private notify: Notify,
    private httpStewardService: HttpStewardService<any, any>) {
      this.viewparam = new Array();
      this.repair = new RepairClass();
      this.devices = new Devices();
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== null) {
          this.fetchRepair(params['id']);
      }
  });
  }

  fetchRepair(id: number) {
    const params: Map<any, string> = new Map();
    const inst = this;
    // fetch repair make list
    this.httpStewardService.get('atlas/repair/' + id, params).subscribe((response) => {
      // //(id);
      //(response);
        if (response.code === 200) {
            inst.repair = response.data;
            inst.devices = response.data.devices;
            let order = 1;
            for (const data of inst.objectKeys(inst.repair)) {
                if (inst.repair[data] !== '') {
                    inst.viewparam.push({
                        value: JSON.stringify(inst.repair[data], null, 2),
                        label: data,
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
