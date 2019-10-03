import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceMake} from '../../../entities/device-make';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Product} from '../../../entities/product-model';
import {DeviceModel} from '../../../entities/device-model';

@Component({
    selector: 'app-approve-upload',
    templateUrl: './approve-upload.component.html',
    styleUrls: ['./approve-upload.component.scss'],
    animations: [routerTransition()]
})
export class ApproveUploadComponent implements OnInit, AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<any, any>, protected notify: Notify) {
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('app-management',

            [
                {
                    data: 'product',
                    render: (d: Product) => {
                        return '';
                    }
                },
                {
                    data: 'product',
                    render: (d: Product) => {
                        return d.productName;
                    }
                },
                {
                    data: 'model',
                    render: (d: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'appName'},
                {data: 'appVersion'},
                {data: 'notesFilepath'},
                {data: 'action'},
                {data: 'actionStatus'},
                {
                    data: 'releaseDate', render: (d: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
            ], 'appId', params);
    }

    ngAfterViewInit(): void {
        $('.select-all-checkbox').click(function () {
            if ($(this).is(':checked')) {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }

}
