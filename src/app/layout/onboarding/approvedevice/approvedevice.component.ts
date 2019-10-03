import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {Devices} from "../../../entities/devices-list-model";
import {Notify} from "../../../shared/classes/notify";
import {DeviceModel} from "../../../entities/device-model";
import {BusinessUnitItem} from "../../../entities/param-business-unit-item-model";

@Component({
    selector: 'app-approvedevice',
    templateUrl: './approvedevice.component.html',
    styleUrls: ['./approvedevice.component.scss'],
    animations: [routerTransition()]
})
export class ApprovedeviceComponent implements OnInit, AfterViewInit {
    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<Devices, any>, protected notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
        this.dtOptions = this.stewardService.intiateDataTable("devices",
            [
                {data: 'partNumber', render: (d?: any) => ''},
                {data: 'serialNo', title: 'Serial Number'},
                {
                    data: 'modelId', title: 'Model',
                    render: (d?: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'}
            ], 'deviceId', params);
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
