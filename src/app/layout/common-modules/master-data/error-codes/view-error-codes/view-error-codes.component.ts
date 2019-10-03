import { Component, OnInit } from '@angular/core';
import { ErrorCodes } from '../../../../../entities/error-codes-model';
import { ViewParamBase } from '../../../../../shared/base/viewParamBase';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../../../router.animations';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-error-codes',
  templateUrl: './view-error-codes.component.html',
  styleUrls: ['./view-error-codes.component.scss'],
  animations: [routerTransition()]
})
export class ViewErrorCodesComponent implements OnInit {
  model: ErrorCodes;
  viewparam: Array<ViewParamBase>;
  objectKeys = Object.keys;

  constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute,  private location: Location) {
      this.model = new ErrorCodes();
      this.viewparam = new Array();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          if (params['id'] != null) {
              this.fetchErrorCodes(params['id']);
          }
      });
  }

  fetchErrorCodes(id: number) {
      let params: Map<any, string> = new Map();
      let inst = this;
      //fetch device make list
      this.stewardService.get('atlas/device_error/' + id, params).subscribe((response) => {
        //   //(response);
          if (response.code == 200) {
              inst.model = response.data;
              let order: number = 1;
              for (let data of inst.objectKeys(inst.model)) {
                  if (inst.model[data] != '') {
                      inst.viewparam.push({
                          value: inst.model[data],
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
  goBack() {
    // window.history.back();
    this.location.back();

    // //( 'goBack()...' );
  }

}
