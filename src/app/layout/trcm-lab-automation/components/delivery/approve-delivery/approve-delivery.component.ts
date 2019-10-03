import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { Notify } from '../../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Repair } from '../../../models/repair/repair';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
  selector: 'app-approve-delivery',
  templateUrl: './approve-delivery.component.html',
  styleUrls: ['./approve-delivery.component.scss'],
  animations: [routerTransition()]
})
export class ApproveDeliveryComponent implements OnInit, AfterViewInit {

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

              ], 'id', params);
  }

     // tslint:disable-next-line:use-life-cycle-interface
     ngAfterViewInit() {
  
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
