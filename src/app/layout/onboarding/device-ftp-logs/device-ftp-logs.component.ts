import {Component, OnInit, Input, Renderer} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {FTPLogs} from '../../../entities/ftp-logs-model';
import {MatDialog} from '@angular/material';
import {DeviceTraceViewComponent} from '../device-trace-view/device-trace-view.component';

@Component({
    selector: 'app-device-ftp-logs',
    templateUrl: './device-ftp-logs.component.html',
    styleUrls: ['./device-ftp-logs.component.scss']
})
export class DeviceFtpLogsComponent implements OnInit {
    @Input() deviceId: string;

    public dtOptions: DataTables.Settings;
    constructor(public dialog: MatDialog, private stewardService: HttpStewardService<any, any>, private notify: Notify, protected renderer: Renderer) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable("download-reports/ftp-logs/device/" + this.deviceId,
            [
                {data: 'logId', render: (d?: any) => ''},
                {
                    data: 'dateTimeAdded',
                    title: 'LOG Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'logLevel', title: 'LOG Level'
                },
                {
                    data: 'message', title: 'Message'
                },
                {data: 'sourceIp', title: 'Source IP'},
                {
                    data: 'logId', title: 'Action', orderable: false,
                    render: function (id: number, comp: any, entity: FTPLogs) {
                        return "<div class='actions-buttons center'>"
                            + "<i class='fa fa-eye pointer' title='View' data-config-id='" + id + "'></i></div>";
                    }
                }
            ], 'logId', params);
    }
    
    ngAfterViewInit() {
        let inst = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("data-config-id")) {
                this.stewardService.get("download-reports/ftp-logs/" + event.target.getAttribute("data-config-id")).subscribe(response => {
                    if (response.code == 200) {   
                        let dialogRef = this.dialog.open(DeviceTraceViewComponent, {
                            width: '500px',
                            data: {
                                data: response.data
                            }
                        });

                        dialogRef.afterClosed().subscribe(result => {
                            //('The dialog was closed');
                        });
                    } else {
                        this.notify.showWarning(response.message);
                    }
                })
            }
        });
    }

}
