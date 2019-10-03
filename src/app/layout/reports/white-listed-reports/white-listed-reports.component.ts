import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceWhitelist} from '../../../entities/device-whitelist';
import {DeviceModel} from '../../../entities/device-model';

@Component({
    selector: 'app-white-listed-reports',
    templateUrl: './white-listed-reports.component.html',
    styleUrls: ['./white-listed-reports.component.scss'],
    animations: [routerTransition()]
})
export class WhiteListedReportsComponent implements OnInit {
    dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceWhitelist, any>) {}

    ngOnInit() {
        this.dtOptions = this.stewardService.intiateDataTable("device/whitelist",
            [
            {data: 'serialNo', render:(d?:any)=>''},
                {data: 'serialNo'},
                {
                    data: 'modelId',
                    render: (d?: DeviceModel) => {
                        return d.model
                    }
                },
                {data: 'action'},
                {data: 'actionStatus'},
                {
                    data: 'creationDate',
                    render: (d?: number) => {
                        return new Date(d).toDateString();
                    }
                },
            ], 'id');
    }

}
