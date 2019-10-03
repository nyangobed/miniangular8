import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceType} from '../../../entities/device-type';
import {Notify} from '../../../shared/classes/notify';

@Component({
    selector: 'app-approve-device-type',
    templateUrl: './approve-device-type.component.html',
    styleUrls: ['./approve-device-type.component.scss'],
    animations: [routerTransition()]
})
export class ApproveDeviceTypeComponent implements OnInit,AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceType, any>, protected notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
        this.dtOptions = this.stewardService.intiateDataTable("device/type",
            [
                {data: 'type', render: (d?: any) => ''},
                {data: 'type'},
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'},
                //                , {
                //                data: "makeId",
                //                render: function (d?: number | string | object) {
                //                    return HttpStewardService.renderMore(d);
                //                }
                //            }
            ], 'deviceTypeId', params);
    }
    
    ngAfterViewInit(): void {
        $(".select-all-checkbox").click(function () {
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
