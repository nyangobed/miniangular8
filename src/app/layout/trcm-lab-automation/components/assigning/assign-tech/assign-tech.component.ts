import {Component, OnInit, Renderer} from '@angular/core';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {Router} from '@angular/router';
import {routerTransition} from '../../../../../router.animations';

@Component({
    selector: 'app-assign-tech',
    templateUrl: './assign-tech.component.html',
    styleUrls: ['./assign-tech.component.scss'],
    animations: [routerTransition()]
})
export class AssignTechComponent implements OnInit {

    dtOptions: DataTables.Settings = {};

    constructor(
        protected notify: Notify,
        protected renderer: Renderer,
        private httpStewardService: HttpStewardService<any, any>,
        public router: Router
    ) {
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Approved');
        this.dtOptions = this.httpStewardService.intiateDataTable('atlas/repair',

            [
                {
                    data: 'id',
                    render: (d?: any) => ''
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
                    title: 'Repair Centre',
                    data: 'repairCentre',
                    render: function (data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Device Errors',
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
                    title: 'Level',
                    data: 'levels',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Parts',
                    data: 'parts',
                    render: function (data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.partNumber).join(', ');
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
                    }
                },
                {
                    title: 'Technician',
                    data: 'users',
                    render: function (data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.fullName).join(', ');
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
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
            ],
            'id',
            params);
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['/trcm-lab-automation/components/receiving/' + event.target.getAttribute('view-config-id') + '/view']);

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

}
