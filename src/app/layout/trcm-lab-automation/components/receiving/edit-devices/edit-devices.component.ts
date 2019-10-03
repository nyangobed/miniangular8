import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
// import { RepairClass, Repair } from '../../../models/repair/repair';
// import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
// import { ActivatedRoute } from '@angular/router';
// import { Notify } from '../../../../../shared/classes/notify';
// import { RepairService } from '../../../services/repair/repair.service';

@Component({
  selector: 'app-edit-devices',
  templateUrl: './edit-devices.component.html',
  styleUrls: ['./edit-devices.component.scss'],
  animations: [routerTransition()]
})
export class EditDevicesComponent implements OnInit {
  isUpdate = false;


  constructor() {
  }

  ngOnInit() {
  }

}
