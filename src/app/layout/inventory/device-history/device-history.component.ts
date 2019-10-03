import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceHistoryWrapper} from '../../../entities/wrappers/device-history-wrapper';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DeviceModel} from '../../../entities/device-model';
import {BusinessUnitItem} from '../../../entities/param-business-unit-item-model';
import {Devices} from '../../../entities/devices-list-model';

@Component({
    selector: 'app-device-history',
    templateUrl: './device-history.component.html',
    styleUrls: ['./device-history.component.scss'],
    animations: [routerTransition()]
})
export class DeviceHistoryComponent implements OnInit {
    model: DeviceHistoryWrapper;
    public dtOptions: DataTables.Settings;
    displayview: boolean = false;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify, private route: ActivatedRoute) {
        this.model = new DeviceHistoryWrapper();
    }

    ngOnInit() {
    }

    onQueryHistory(form: NgForm) {
        let params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('devices/search/' + this.model.serialNo,
            [
                {data: 'serialNo', render: (d?: any) => ''},
                {data: 'serialNo', title: 'Serial Number'},
                {
                    data: 'modelId', title: 'Model',
                    render: (d?: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'deviceId', title: 'Action',
                    render: function (id: number, comp: any, entity: Devices) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'deviceId', params);
        this.displayview = true;
    }

}
