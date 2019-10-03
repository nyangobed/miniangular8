import {Component, OnInit, Input} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {HeartBeats} from '../../../entities/heartbeats-model';

@Component({
    selector: 'app-device-heartbeats-stats',
    templateUrl: './device-heartbeats-stats.component.html',
    styleUrls: ['./device-heartbeats-stats.component.scss']
})
export class DeviceHeartbeatsStatsComponent implements OnInit {
    @Input() deviceId: string;

    public dtOptions: DataTables.Settings;
    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("sort", "logId,desc")
        this.dtOptions = this.stewardService.intiateDataTable("heart-beat/device/" + this.deviceId,
            [
                {data: 'serialNo', render: (d?: any) => ''},
                {data: 'serialNo', title: 'Serial No'},
                {
                    data: 'creationDate',
                    title: 'Heartbeat Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'batteryPercentage', title: 'Battery Percentage',
                    render: function (val: any) {
                        return val + '%';
                    }
                },
                {
                    data: 'chargingStatus', title: 'Charging Status',
                    render: (d?: any) => {
                        if (d == '1') {
                            return 'Yes';
                        } else {
                            return 'No';
                        }
                    }
                },
                {
                    data: 'signalStrength', title: 'Signal Strength'
                },
                {data: 'osVersion', title: 'OS Version'}
            ], 'logId', params);
    }
}
