import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Devices} from '../../../entities/devices-list-model';

@Component({
    selector: 'app-completed-downloads-reports',
    templateUrl: './completed-downloads-reports.component.html',
    styleUrls: ['./completed-downloads-reports.component.scss'],
    animations: [routerTransition()]
})
export class CompletedDownloadsReportsComponent implements OnInit {
    public dtOptions: DataTables.Settings;
    constructor(protected stewardService: HttpStewardService<any, any>, private notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("downloadStatus", "COMPLETED");
        this.dtOptions = this.stewardService.intiateDataTable("download-reports/device-task",
            [
                {data: 'taskId', render: (d?: any) => ''},
                {data: 'deviceId', title: 'Serial No', render: (d?: Devices) => d.serialNo},
                {
                    data: 'startDownloadTime', title: 'Start Time', render: (d?: number) => {
                        if (d != null)
                            return new Date(d).toLocaleString();
                        else
                            return 'N/A';
                    }
                },
                {
                    data: 'endDownloadTime', title: 'End Time', render: (d?: number) => {
                        if (d != null)
                            return new Date(d).toLocaleString();
                        else
                            return 'N/A';
                    }
                },
                {data: 'downloadStatus', title: 'Status'}
            ], 'taskId', params);
    }
}
