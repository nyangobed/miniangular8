import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PartHistory } from '../entities/partshistory';
import { Notify } from '../../../../shared/classes/notify';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-parts-history',
    templateUrl: './parts-history.component.html',
    styleUrls: ['./parts-history.component.scss'],
    animations: [routerTransition()]
})
export class PartsHistoryComponent implements OnInit, AfterViewInit {
    PartHistory = new PartHistory;
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<any, any>,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router,
        private location: Location,
        ) {
    }

    goBack() {
        // window.history.back();
        this.location.back();
        //( 'goBack()...' );
      }
      ngOnInit(): void {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('atlas/repair',
            [
                {
                    data: 'name', render: (d?: any) => ''
                },
                {
                    title: 'Serial  Number',
                    data: 'devices.serialnumber'

                },
                {
                    title: 'Part  Number',
                    data: 'devices.partnumber'

                },
                {
                    title: 'IMEI Number',
                    data: 'devices.imeinumber'

                },
                {
                    title: 'Device Owner',
                    data: 'devices.deviceowner'

                },
                {
                    title: 'Part Model',
                    data: 'parts',
                    render: function (data) {
                        return data.length > 0 ? data[0].partModel : '';
                    }
                },
                {
                    title: 'Part Name',
                    data: 'parts',
                    render: function (data) {
                        return data.length > 0 ? data[0].partName : '';
                    }
                },
                {
                    title: 'Description',
                    data: 'parts',
                    render: function (data) {
                        return data.length > 0 ? data[0].description : '';
                    }
                },

             ], 'id', params);
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['../../../trcm-lab-automation/parts/parts-onboarding/' + event.target.getAttribute('edit-config-id') + '/update']);
            }

            if (event.target.hasAttribute('view-config-id')) {
                this.router.navigate(['../../../trcm-lab-automation/parts/parts-onboarding/' + event.target.getAttribute('view-config-id') + '/view']);

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

