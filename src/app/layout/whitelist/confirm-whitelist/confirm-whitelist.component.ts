import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {DeviceWhitelist} from '../../../entities/device-whitelist';
import {DeviceModel} from '../../../entities/device-model';

@Component({
    selector: 'app-confirm-whitelist',
    templateUrl: './confirm-whitelist.component.html',
    styleUrls: ['./confirm-whitelist.component.scss'],
    animations: [routerTransition()]
})
export class ConfirmWhitelistComponent implements OnInit, AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceWhitelist, any>, protected notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unconfirmed");
        this.dtOptions = this.stewardService.intiateDataTable("device/whitelist",
            [
                {data: 'serialNo', render: (d?: any) => ''},
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
            ], 'id', params);
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
