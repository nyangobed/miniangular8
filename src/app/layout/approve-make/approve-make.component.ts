import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {routerTransition} from './../../router.animations';
import {DeviceMake} from '../../entities/device-make';
import {HttpStewardService} from '../../shared/services/http-steward.service';
import {Notify} from '../../shared/classes/notify';

@Component({
    selector: 'app-approve-make',
    templateUrl: './approve-make.component.html',
    styleUrls: ['./approve-make.component.scss'],
    animations: [routerTransition()]
})
export class ApproveMakeComponent implements OnInit, AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(
        protected stewardService: HttpStewardService<DeviceMake, DeviceMake>, protected notify: Notify) {
        //        super(stewardService, notify);
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('device/make',
            [
                {data: 'make', render: (d?: any) => ''},
                {data: 'make'},
                {data: 'vendorName'},
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'}
            ], 'makeId', params);
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
