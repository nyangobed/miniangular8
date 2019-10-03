import { Component, OnInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { Repair } from '../../../models/repair/repair';
import { Notify } from '../../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-approve-devices',
  templateUrl: './approve-devices.component.html',
  styleUrls: ['./approve-devices.component.scss'],
  animations: [routerTransition()]
})
export class ApproveDevicesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
      constructor(
        protected notify: Notify,
        protected renderer: Renderer,
        private httpStewardService: HttpStewardService<any, any>,
        public router: Router,
        private location: Location) { }

        ngOnInit() {
          const params: Map<any, string> = new Map();
          params.set('actionStatus', 'Unapproved');
          this.dtOptions = this.httpStewardService.intiateDataTable('atlas/repair',

              [
                {
                  data: 'id', render: (d?: any) => ''
            },
            {
                  title: 'Batch',
                  data: 'batchNumber',
                  render: function (data) {
                      return data ? data : '';
                  }
            },
            {
              title: 'Serial Number',
              data: 'serialNumber',
              render: function (data) {
                  return data ? data : '';
                }
            },
            {
              title: 'Part Number',
              data: 'devices',
              render: function (data) {
                return data ? data.partnumber : '';
              }
            },
            {
              title: 'IMEI',
              data: 'devices',
              render: function (data) {
                return data ? data.imeinumber : '';
              }
            },
            {
                  title: 'Client',
                  data: 'devices',
                  render: function (data) {
                    return data ? data.deviceowner : '';
                  }
            },
            {
                  title: 'Received By',
                  data: 'receivedBy',
                  render: function (data) {
                    return data ? data : '';
                  }
            },
            {
                  title: 'Received From',
                  data: 'receivedFrom',
                  render: function (data) {
                    return data ? data : '';
                  }
            },
            {
              title: 'Contract',
              data: 'devices',
              render: function (data) {
                return data ? data.deviceContractStatus : '';
              }
            },
            {
              title: 'Warranty',
              data: 'devices',
              render: function (data) {
                return data ? data.deviceWarantyStatus : '';
              }
          },
            {
              title: 'Repair Centre',
              data: 'repairCentre',
              render: function (data) {
                return data ? data : '';
              }
            },
            {
              title: 'Received Date',
              data: 'createdOn',
              render: function (data) {
                return data ? data : '';
              }
            },
            {
              title: 'Action Status',
              data: 'actionStatus',
              render: function (data) {
                return data ? data : '';
              }
            },
                  // {
                  //     data: 'id', title: 'Action', orderable: false,
                  //     render: function (id: number, comp: any, entity: Repair) {
                  //         return '<div class=\'actions-buttons right\' id=\'' + id + '\'>'
                  //             // + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                  //             + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                  //             + '</div>';
                  //     }
                  // }
              ], 'id', params);
      }

      // tslint:disable-next-line:use-life-cycle-interface
      ngAfterViewInit() {
          //   this.renderer.listenGlobal('document', 'click', (event) => {
          //       // if (event.target.hasAttribute('edit-config-id')) {
          //       //     this.router.navigate(['/trcm-lab-automation/components/receiving/' + event.target.getAttribute('edit-config-id') + '/update']);
          //       // }
          // if (event.target.hasAttribute('view-config-id')) {
          //           this.router.navigate(['/trcm-lab-automation/components/receiving/' + event.target.getAttribute('view-config-id') + '/view']);

          //       }
          //   });

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

        /** REDIRECT THE PAGE */
    goBack() {
      // window.history.back();
      this.location.back();

    }
}
