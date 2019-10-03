import { Component, OnInit, Renderer } from '@angular/core';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Repair } from '../../models/repair/repair';
import { routerTransition } from '../../../../router.animations';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
  animations: [routerTransition()]
})
export class DeliveryComponent implements OnInit {

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
    this.dtOptions = this.httpStewardService.intiateDataTable('atlas/delivery',

        [
            {
              data: 'id', render: (d?: any) => ''
            },
            {
              title: 'Client',
              data: 'devices',
              render: function (data) {
                return data ? data.deviceowner : '';
              }
            },
            {
              title: 'Serial Number',
              data: 'devices',
              render: function (data) {
                return data ? data.serialnumber : '';
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
              title: 'Delivered By',
              data: 'deliveredBy',
              render: function (data) {
                return data ? data : '';
              }
            },
            {
              title: 'Delivery Status',
              data: 'deliveryStatus',
              render: function (data) {
                return data ? data : '';
              }
            },
            {
              title: 'Date',
              data: 'creationOn',
              render: function (data) {
                return data ? data : '';
              }
            },
            {
              title: 'Location',
              data: 'location',
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
            {
                data: 'id', title: 'Action', orderable: false,
                render: function (id: number, comp: any, entity: Repair) {
                    return '<div class=\'actions-buttons right\' id=\'' + id + '\'>'
                        + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                        // + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                        + '</div>';
                }
            }
        ], 'id', params);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.renderer.listenGlobal('document', 'click', (event) => {
        if (event.target.hasAttribute('edit-config-id')) {
            this.router.navigate(['/trcm-lab-automation/components/delivery/view-delivery/' + event.target.getAttribute('edit-config-id') + '/edit']);
        }
  // if (event.target.hasAttribute('view-config-id')) {
  //           this.router.navigate(['/trcm-lab-automation/components/delivery/update-delivery' + event.target.getAttribute('view-config-id') + '/view']);

  //       }
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

      /** Previous Page functionality */
      goBack() {
        // window.history.back();
        this.location.back();

      }

}
