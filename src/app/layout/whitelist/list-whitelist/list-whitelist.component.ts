import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceWhitelist} from '../../../entities/device-whitelist';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {DeviceModel} from '../../../entities/device-model';
import {single, multi} from './data';

@Component({
    selector: 'app-list-whitelist',
    templateUrl: './list-whitelist.component.html',
    styleUrls: ['./list-whitelist.component.scss'],
    animations: [routerTransition()]
})
export class ListWhitelistComponent implements OnInit, AfterViewInit {

    single: any[];
    multi: any[];

    view: any[] = [700, 400];

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<DeviceWhitelist, any>) {
        Object.assign(this, {single, multi})
    }

    ngOnInit() {
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
            ], 'id');
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
