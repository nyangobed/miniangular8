import {
    Component,
    OnInit,
    Renderer,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { Notify } from '../../../../shared/classes/notify';
import { Repair } from '../../models/repair/repair';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
// import { DataTableDirective } from 'angular-datatables';

@Component({
    selector: 'app-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss'],
    animations: [routerTransition()]
})
export class DiagnosisComponent implements OnInit, AfterViewInit {
    // @ViewChild(DataTableDirective, {static: false})
    // datatableElement: DataTableDirective;

    filterForm: FormGroup;
    repairLevel = ['LEVEL 1', 'LEVEL 2', 'LEVEL 3', 'LEVEL 4'];
    Repair: any;

    dtOptions: any = {};
    return_part: string;

    constructor(
        private fb: FormBuilder,
        protected notify: Notify,
        protected renderer: Renderer,
        private httpStewardService: HttpStewardService<any, any>,
        public router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        /** CALL THE SEARCH FORM METHOD */
        this.searchForm();

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
                    data: 'batchNumber',
                    render: function(data) {
                        return data ? data : '';
                    }
                },
                {
                    title: 'Serial Number',
                    data: 'devices',
                    render: function(data) {
                        return data ? data.serialnumber : '';
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
                    title: 'Reported Defect',
                    data: 'reportedDefects',
                    render: function(data) {
                        return data ? data : '';
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
                    title: 'Device Level',
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
                    title: 'Received Date',
                    data: 'createdOn',
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
                {
                    data: 'id',
                    title: 'Action',
                    orderable: false,
                    render: function(id: number, comp: any, entity: Repair) {
                        return (
                            '<div class=\'actions-buttons right\' id=\'' +
                            id +
                            '\'>' +
                            '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' +
                            id +
                            '"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                            // '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' +
                            // id +
                            // '"></i>' +
                            '</div>'
                        );
                    }
                }
            ],
            'id',
            params
        );
    }

    searchForm() {
        this.filterForm = this.fb.group({
            end: ['', [Validators.required]],
            start: ['', [Validators.required]],
            customer: ['', [Validators.required]]
        });
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', event => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate([
                    '/trcm-lab-automation/components/diagnosis/update/' +
                        event.target.getAttribute('edit-config-id') +
                        '/update'
                ]);
            }
            // if (event.target.hasAttribute('view-config-id')) {
            //     this.router.navigate([
            //         '/trcm-lab-automation/components/diagnosis/display/' +
            //             event.target.getAttribute('view-config-id') +
            //             '/view'
            //     ]);
            // }
        });

        $('.select-all-checkbox').click(function() {
            if ($(this).is(':checked')) {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });

        // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     dtInstance.columns().every(function () {
        //       const that = this;
        //       $('input', this.footer()).on('keyup change', function () {
        //         if (that.search() !== this['value']) {
        //           that
        //             .search(this['value'])
        //             .draw();
        //         }
        //       });
        //     });
        //   });
    }

    filter(): void {
        // Instantiate a FormData to store form fields and encode the file
        const body = new FormData();

        // Add the start date.
        body.append('start', this.filterForm.get('start').value);
        // Add the end date.
        body.append('end', this.filterForm.get('end').value);
        // Add the client section.
        body.append('customer', this.filterForm.get('customer').value);
        // Launch post request
        this.httpStewardService.get('atlas/repair/search', body).subscribe(
            // log results
            data => {
                //('FILTER DATA', data);
            },
            // Or errors
            error => //(error),
            // tell us if it's finished
            () => {
                //('completed');
            }
        );
    }

    /** REDIRECT THE PAGE */
    goBack() {
        // window.history.back();
        this.location.back();
    }
}
