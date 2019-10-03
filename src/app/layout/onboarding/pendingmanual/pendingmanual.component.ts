import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {DeviceTasks} from "../../../entities/pending-tasks-manual";
import {Product} from "../../../entities/product-model";
import {DeviceMake} from "../../../entities/device-make";
import {Devices} from "../../../entities/devices-list-model";
import {DeviceModel} from "../../../entities/device-model";

@Component({
    selector: 'app-pendingmanual',
    templateUrl: './pendingmanual.component.html',
    styleUrls: ['./pendingmanual.component.scss'],
    animations: [routerTransition()]
})
export class PendingmanualComponent implements OnInit {
    public dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceTasks, DeviceTasks>) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable("schedule/manual",
            [
                {
                    data: 'scheduleId.scheduledTime',
                    title: 'Schedule Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {data: 'scheduleId.noFiles', title: 'No of Files'},
                {
                    data: 'scheduleId.productId', title: 'Product',
                    render: (d?: Product) => {
                        return d.productName;
                    }
                },
                {
                    data: 'deviceId.modelId', title: 'Model',
                    render: (d?: DeviceModel) => {
                        return d.model;
                    }
                }//,
//                {
//                    data: 'deviceId.deviceId', title: 'Action',
//                    render: function (id: number, comp: any, entity: Devices) {
//                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
//                            + '<a _ngcontent-c16 ng-reflect-router-link="/devices/list/' + id + '/update" href="/devices/list/' + id + '/update"><i class=\'fa fa-edit\' title=\'Edit\'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
//                            + '<a _ngcontent-c16 ng-reflect-router-link="/devices/list/' + id + '/update" href="/devices/list/' + id + '/update"><i class=\'fa fa-trash-o\' title=\'Edit\'></i></a>'
//                            + '</div>';
//
//                    }
//                }
            ], 'taskId', params);
    }

}
