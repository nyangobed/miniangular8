import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceWhitelist} from '../../../entities/device-whitelist';
import {Notify} from '../../../shared/classes/notify';
import {DeviceModel} from '../../../entities/device-model';
import {routerTransition} from '../../../router.animations';

@Component({
    selector: 'app-approve-whitelist',
    templateUrl: './approve-whitelist.component.html',
    styleUrls: ['./approve-whitelist.component.scss'],
    animations: [routerTransition()]
})
export class ApproveWhitelistComponent implements OnInit,AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceWhitelist, any>, protected notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
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
