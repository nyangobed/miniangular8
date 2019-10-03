import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { RepairClass } from '../../../models/repair/repair';
import { Devices } from '../../../../../entities/devices-list-model';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-view-assigning',
  templateUrl: './view-assigning.component.html',
  styleUrls: ['./view-assigning.component.scss'],
  animations: [routerTransition()]
})
export class ViewAssigningComponent implements OnInit {

  repair: RepairClass;
  devices: Devices;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.values;

  constructor(private activatedRoute: ActivatedRoute, private notify: Notify,
    private httpStewardService: HttpStewardService<any, any>) {
      this.viewparam = new Array();
      this.repair = new RepairClass();
      this.devices = new Devices();
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== null) {
          this.fetchUsers(params['id']);
      }
  });
  }

  fetchUsers(id: number) {
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
