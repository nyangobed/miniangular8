import { Component, OnInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { Router } from '@angular/router';
import { Notify } from '../../../../shared/classes/notify';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { device } from '../Entities/device-model';
import { Location } from '@angular/common';
import { OnboardingserviceService } from '../onboardingservice.service';
import { GlobalParams } from '../../../../shared/services/globalparams';

@Component({
  selector: 'app-deviceonboarding',
  templateUrl: './deviceonboarding.component.html',
  styleUrls: ['./deviceonboarding.component.scss'],
  animations: [routerTransition()]
})
export class DeviceonboardingComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  customers;
   // tslint:disable-next-line:semicolon
  devices = []
  data: any = [];
    
        constructor(
          // private stewardServices: HttpStewardService<device, device>,
          private onboardingservices: OnboardingserviceService<any, any>,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router,
        private globalParam: GlobalParams,
        private location: Location) {
  }
  /**
* Retrieve data being edited
*/

    ngOnInit(): void {
      const params: Map<any, string> = new Map();
      this.dtOptions = this.onboardingservices.intiateDataTable('atlas/devices',
      [
              {
      data: 'name', render: (d?: any) => ''
              },
              {
                    title: 'Serial Number',
                    data: 'serialnumber'
              },
              {
                    title: 'Part Number',
                     data: 'partnumber'
               },
               {
                    title: 'IMEI Number',
                    data: 'imeinumber'
              },
              {
                    title: 'Model',
                    data: 'deviceModels'
              },
              {
                    title: 'Device Owner',
                     data: 'deviceowner'
                },
               {
                     title: 'Creation Date',
                     data: 'creationDate'
                },
                {
                    title: 'Warranty Starts',
                     data: 'warranty_starts'
                  },
                {
                    title: 'Warranty Period',
                     data: 'warrantyperiod'
                  },
                  {
                     title: 'Warranty Expiry',
                     data: 'warrantyExpire'
                  },
                  {
                     title: 'Warranty Status',
                     data: 'deviceWarantyStatus'
                  },
                  {
                        title: 'AMC Period',
                      data: 'contractperiod'
                    },
                    {
                         title: 'Contract Starts',
                         data: 'contract_starts'
                    },
                   {
                       title: 'Contract Expiry',
                         data: 'contract_expires'
                    },
                    {
                    title: 'Contract Status',
                    data: 'deviceContractStatus'
                    },
                    {
                    title: 'POS Seller',
                    data: 'seller'
                    },

                    {
                     title: 'Action Status',
                      data: 'actionStatus'
                    },
                     {
                  data: 'id', title: 'Action', orderable: false,
                  render: function (id: number, comp: any, entity: device) {
                      return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                           + '<i class=\'fa fa-edit pointer\' title=\'update contract period\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                          + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                          + '</div>';
                  }
              }
          ], 'id', params);
  }
// DOWNLOAD EXCEL 
  exportAsXLSX() {
  document.location.href= this.globalParam.baseUrl + 'atlas/devices/sampleFile';
 }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                 this.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding/update-contractperiod/' + event.target.getAttribute('edit-config-id') + '/edit']);
            }
       if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding/' + event.target.getAttribute('view-config-id') + '/view']);

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
