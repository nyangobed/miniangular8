import {Component, OnInit, Input} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';

@Component({
    selector: 'app-device-downloads',
    templateUrl: './device-downloads.component.html',
    styleUrls: ['./device-downloads.component.scss']
})
export class DeviceDownloadsComponent implements OnInit {
    @Input() deviceId: number;
    public dtOptions: DataTables.Settings;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify) {}

    ngOnInit() {
    }

}
