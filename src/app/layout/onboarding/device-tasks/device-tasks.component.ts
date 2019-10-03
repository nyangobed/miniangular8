import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {DataTableDirective} from 'angular-datatables';

@Component({
    selector: 'app-device-tasks',
    templateUrl: './device-tasks.component.html',
    styleUrls: ['./device-tasks.component.scss']
})
export class DeviceTasksComponent implements OnInit {
    @Input() deviceId: string;
    public dtOptions: DataTables.Settings;

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("deviceId", this.deviceId);
        this.dtOptions = this.stewardService.intiateDataTable("download-reports/device-task",
            [
                {data: 'taskId', render: (d?: any) => ''},
                {data: 'taskId', title: 'Task ID'},
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

    public tableRedraw(): void {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

}
