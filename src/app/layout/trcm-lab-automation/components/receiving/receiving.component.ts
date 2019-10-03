import { Component, OnInit, Renderer, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { Repair } from '../../models/repair/repair';
import { Notify } from '../../../../shared/classes/notify';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { GlobalParams } from '../../../../shared/services/globalparams';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss'],
  animations: [routerTransition()]
})

export class ReceivingComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};

  constructor(
    protected notify: Notify,
    protected renderer: Renderer,
    private globalParam: GlobalParams,
    private httpStewardService: HttpStewardService<any, any>,
    public router: Router, private location: Location) { }

  ngOnInit() {
    const params: Map<any, string> = new Map();
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
            }
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

    downloadFile() {
        window.location.href = this.globalParam.baseUrl + 'atlas/repair/template';
    }

    /** REDIRECT THE PAGE */
    goBack() {
      // window.history.back();
      this.location.back();

    }


}
