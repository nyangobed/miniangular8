import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceModel} from '../../../entities/device-model';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {DeviceType} from '../../../entities/device-type';
import {DeviceMake} from '../../../entities/device-make';
import {DeviceFileExt} from '../../../entities/device-file-type';

@Component({
    selector: 'app-approve-device-model',
    templateUrl: './approve-device-model.component.html',
    styleUrls: ['./approve-device-model.component.scss'],
    animations: [routerTransition()]
})
export class ApproveDeviceModelComponent implements OnInit, AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceModel, any>, protected notify: Notify) {
    }

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('device/model',
            [
                {data: 'model', render: (d?: any) => ''},
                {data: 'model'},
                {
                    data: 'deviceType',
                    render: (d?: DeviceType) => {
                        return d.type;
                    }
                },
                {
                    data: 'make',
                    render: (d?: DeviceMake) => {
                        return d.make;
                    }
                }
                , {
                data: 'deviceFileExt',
                render: function (entity?: DeviceFileExt) {
                    if (entity != null) {
                        return entity.paramFileExt;
                    } else {
                        return '';
                    }
                }
            },
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'}
            ], 'modelId', params);
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
