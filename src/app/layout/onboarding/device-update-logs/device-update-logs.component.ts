import {Component, OnInit, Input} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';

@Component({
    selector: 'app-device-update-logs',
    templateUrl: './device-update-logs.component.html',
    styleUrls: ['./device-update-logs.component.scss']
})
export class DeviceUpdateLogsComponent implements OnInit {
    @Input() deviceId: string;
    public dtOptions: DataTables.Settings;
    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("sort", "logId,desc");
        params.set("deviceId", this.deviceId);
        this.dtOptions = this.stewardService.intiateDataTable("download-reports/update-logs",
            [
                {data: 'logId', render: (d?: any) => ''},
                {data: 'logId', title: 'Log ID'},
                {data: 'dateTimeAdded', title: 'Time Created', render: (d?: number) => {return new Date(d).toLocaleString()}},
                {data: 'completedFiles', title: 'Completed Files'},
                {data: 'status', title: 'Status'}
            ], 'logId', params);
    }

}
