import {
    Component,
    OnInit,
    Renderer,
    AfterViewInit
} from '@angular/core';
import { Notify } from '../../../shared/classes/notify';
import { Router } from '@angular/router';
import { HttpStewardService } from '../../../shared/services/http-steward.service';
import { routerTransition } from '../../../router.animations';
import { Location } from '@angular/common';

@Component({
    selector: 'app-repair-reports',
    templateUrl: './repair-reports.component.html',
    styleUrls: ['./repair-reports.component.scss'],
    animations: [routerTransition()]
})
export class RepairReportsComponent
    implements OnInit, AfterViewInit {
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
            this.dtOptions = this.httpStewardService.intiateDataTable(
                'atlas/repair',
    
                [
                    {
                        data: 'id',
                        render: (d?: any) => ''
                    },
                    {
                        title: 'Batch',
                        data: 'batchNumber'
                    },
                    {
                        title: 'Serial Number',
                        data: 'devices.serialnumber'
                    },
                    {
                        title: 'Part Number',
                        data: 'devices.partnumber'
                    },
                    {
                        title: 'IMEI',
                        data: 'devices.imeinumber'
                    },
                    {
                        title: 'Client',
                        data: 'devices.deviceowner'
                    },
                    {
                        title: 'Contract',
                        data: 'devices.deviceContractStatus'
                    },
                    {
                        title: 'Failure Found',
                        data: 'deviceErrors',
                        render: function(data) {
                            return data.length > 0 ? data[0].codeName : '';
                        }
                    },
                    {
                        title: 'Repair levels',
                        data: 'levels',
                        render: function(data) {
                            return data.length > 0 ? data[data.length - 1] : '';
                        }
                    },
                    {
                        title: 'QA Status',
                        data: 'qaTest'
                    },
                    {
                        title: 'QA Pass Date',
                        data: 'qaTestPassedDate'
                    },
                    {
                        title: 'Technician',
                        data: 'users',
                        render: function(data) {
                            return data.length > 0 ? data[0].fullName : '';
                        }
                    },
                    {
                        title: 'Parts',
                        data: 'parts',
                        render: function(data) {
                            return data.length > 0 ? data[0].partName : '';
                        }
                    },
                    {
                        title: 'Repair Status',
                        data: 'repairStatus'
                    },
                    {
                        title: 'Repair Centre',
                        data: 'repairCentre'
                    },
                    {
                        title: 'Comment',
                        data: 'comments'
                    },
                    {
                        title: 'Action Status',
                        data: 'actionStatus'
                    },
                    // {
                    //     data: 'id',
                    //     title: 'Action',
                    //     orderable: false,
                    //     render: function(id: number, comp: any, entity: Repair) {
                    //         return (
                    //             '<div class=\'actions-buttons right\' id=\'' +
                    //             id +
                    //             '\'>' +
                    //             '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' +
                    //             id +
                    //             '"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    //             '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' +
                    //             id +
                    //             '"></i>' +
                    //             '</div>'
                    //         );
                    //     }
                    // }
                ],
                'id',
                params
            );
        }
    
        // tslint:disable-next-line:use-life-cycle-interface
        ngAfterViewInit() {
            // this.renderer.listenGlobal('document', 'click', event => {
            //     if (event.target.hasAttribute('edit-config-id')) {
            //         this.router.navigate([
            //             '/trcm-lab-automation/components/repair/update-devices/' +
            //                 event.target.getAttribute('edit-config-id') +
            //                 '/edit'
            //         ]);
            //     }
            //     if (event.target.hasAttribute('view-config-id')) {
            //         this.router.navigate([
            //             '/trcm-lab-automation/components/repair/update-devices/' +
            //                 event.target.getAttribute('view-config-id') +
            //                 '/view'
            //         ]);
            //     }
            // });

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
            // window.history.back();
            this.location.back();
        }
}
