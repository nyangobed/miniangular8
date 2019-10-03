import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { Notify } from '../../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Repair } from '../../../models/repair/repair';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-approve-screening',
  templateUrl: './approve-screening.component.html',
  styleUrls: ['./approve-screening.component.scss'],
  animations: [routerTransition()]
})
export class ApproveScreeningComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};

  constructor(
    protected notify: Notify,
    protected renderer: Renderer,
    private httpStewardService: HttpStewardService<any, any>,
    public router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    const params: Map<any, string> = new Map();
    params.set('actionStatus', 'Unapproved');
    this.dtOptions = this.httpStewardService.intiateDataTable('atlas/repair',

        [
            {
                  data: 'devices.id', render: (d?: any) => ''
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
              title: 'Failure Found',
              data: 'deviceErrors',
              render: function (data: Array<any>) {
                return data.length > 0 ? data[0].codeName : '';
              }
            },
            {
              title: 'Device Level',
              data: 'levels',
              render: function(data) {
                return data ? data : '';
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
            //             + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
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
  //       //     this.router.navigate(['/trcm-lab-automation/components/screening/' + event.target.getAttribute('edit-config-id') + '/update']);
  //       // }
  // if (event.target.hasAttribute('view-config-id')) {
  //           this.router.navigate(['/trcm-lab-automation/components/screening/' + event.target.getAttribute('view-config-id') + '/view']);

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
