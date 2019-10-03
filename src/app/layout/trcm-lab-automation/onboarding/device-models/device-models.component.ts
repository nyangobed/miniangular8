import { Component, OnInit, Renderer } from '@angular/core';
import { customer } from '../Entities/customer-model';
import { Router } from '@angular/router';
import { Notify } from '../../../../shared/classes/notify';
import { OnboardingserviceService } from '../onboardingservice.service';
import {Location} from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { DeviceModel } from '../Entities/devicetype';

@Component({
  selector: 'app-device-models',
  templateUrl: './device-models.component.html',
  styleUrls: ['./device-models.component.scss'],
  animations: [routerTransition()]
})
export class DeviceModelsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  customers;
    constructor(
      // private stewardServices: HttpStewardService<customer, customer>,
      private onboardingservices: OnboardingserviceService<DeviceModel, DeviceModel>,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router,
        private location: Location) {

     }

    ngOnInit(): void {
      const params: Map<any, string> = new Map();
      this.dtOptions = this.onboardingservices.intiateDataTable('atlas/deviceModel',
          [
              {
                    data: 'name', render: (d?: any) => ''
              },
              {
               title: 'Device Model',
               data: 'name'
              },
              {
              title: 'Created On',
              data: 'creationDate'
              },
              {
              title: 'Intrash',
              data: 'intrash'
              },
              {
              title: 'Action Status',
              data: 'actionStatus'
              },
              {
                  data: 'id', title: 'Action', orderable: false,
                  render: function (id: number, comp: any, entity: DeviceModel) {
                      return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                          + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                          + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                          + '</div>';
                  }
              }
          ], 'id', params);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/trcm-lab-automation/onboarding/device-models/' + event.target.getAttribute('edit-config-id') + '/update']);
            }
        if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['/trcm-lab-automation/onboarding/device-models/' + event.target.getAttribute('view-config-id') + '/view']);

            }
        });

        $('.select-all-checkbox').click(function () {
            if ($(this).is(':checked')) {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }
    goBack() {
      // window.history.back();
      this.location.back();

      //( 'goBack()...' );
    }
  }
