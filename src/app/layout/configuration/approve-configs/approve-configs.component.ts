import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {SysConfig} from '../../../entities/sys-config';

@Component({
    selector: 'app-approve-configs',
    templateUrl: './approve-configs.component.html',
    styleUrls: ['./approve-configs.component.scss'],
    animations: [routerTransition()]
})
export class ApproveConfigsComponent implements OnInit,AfterViewInit {

    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<SysConfig, any>, protected notify: Notify) {}

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set('actionStatus', 'Unapproved');
        this.dtOptions = this.stewardService.intiateDataTable('ufs-common-modules/api/v1/system-config',

            [
                {data: 'parameter', render: (d?: any) => {return '';}},
                {data: 'parameter'},
                {data: 'value'},
                {data: 'description'},
                {data: 'action'},
                {data: 'actionStatus'}
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
