import { Component, OnInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { Notify } from '../../../../../shared/classes/notify'
import { Router } from '@angular/router';
import { Repair } from '../../../models/repair/repair';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
    selector: 'app-approve-repair',
    templateUrl: './approve-repair.component.html',
    styleUrls: ['./approve-repair.component.scss'],
    animations: [routerTransition()]
})
export class ApproveRepairComponent implements OnInit {
    dtOptions: DataTables.Settings = {};

    constructor(
        protected notify: Notify,
        protected renderer: Renderer,
        private httpStewardService: HttpStewardService<any, any>,
        public router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.httpStewardService.intiateDataTable(
            'atlas/repair',

            [
                {
                    data: 'id',
                    render: (d?: any) => ''
                },
                {
                    title: 'Batch',
                    data: 'batchNumber',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Serial Number',
                    data: 'serialNumber',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Part Number',
                    data: 'devices',
                    render: function(data) {
                        return data ? data.partnumber : '';
                    }
                },
                {
                    title: 'IMEI',
                    data: 'devices',
                    render: function(data) {
                        return data ? data.imeinumber : '';
                    }
                },
                {
                    title: 'Client',
                    data: 'devices',
                    render: function(data) {
                        return data ? data.deviceowner : '';
                    }
                },
                {
                    title: 'Failure Found',
                    data: 'deviceErrors',
                    render: function (data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.code).join(' ');
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
                    }
                },
                {
                    title: 'Repair levels',
                    data: 'levels',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'QA Status',
                    data: 'qaTest',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'QA Test Date',
                    data: 'qaTestPassedDate',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Repaired By',
                    data: 'users',
                    render: function(data: Array<any>) {
                        return data.length > 0 ? data[0].fullName : '';
                    }
                },
                {
                    title: 'Parts',
                    data: 'parts',
                    render: function (data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.partName).join(', ');
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
                    }
                },
                {
                    title: 'Repair Status',
                    data: 'repairStatus',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Repair Centre',
                    data: 'repairCentre',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Comment',
                    data: 'comments',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Action Status',
                    data: 'actionStatus',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
            ],
            'id',
            params
        );
    }



    ngAfterViewInit() {
        $('.select-all-checkbox').click(function() {
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
      this.location.back();
  }
}
