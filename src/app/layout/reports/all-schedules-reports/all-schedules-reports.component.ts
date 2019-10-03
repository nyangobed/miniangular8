import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Schedule} from '../../../entities/schedules-model';
import {Product} from '../../../entities/product-model';
import {DeviceMake} from '../../../entities/device-make';
import {routerTransition} from '../../../router.animations';
import {DataTableDirective} from 'angular-datatables';

@Component({
    selector: 'app-all-schedules-reports',
    templateUrl: './all-schedules-reports.component.html',
    styleUrls: ['./all-schedules-reports.component.scss'],
    animations: [routerTransition()]
})
export class AllSchedulesReportsComponent implements OnInit {
    public dtOptions: DataTables.Settings;

    minDate = new Date();
    maxDate = new Date(2020, 0, 1);

    defaultTime = {hour: 13, minute: 30};
    meridianTime = {hour: 13, minute: 30};
    meridian = true;
    seconds = true;
    fromDate: Date;
    toDate: Date;
    serialNo: string;

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;

    constructor(protected stewardService: HttpStewardService<Schedule, Schedule>) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable("schedule",
            [
                {data: 'noFiles', render: (d?: any) => ''},
                {
                    data: 'scheduledTime',
                    title: 'Schedule Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {data: 'noFiles', title: 'No of Files'},
                {
                    data: 'productId', title: 'Business Unit',
                    render: (d?: Product) => {
                        return d.productName;
                    }
                },
                {
                    data: 'scheduleType', title: 'Schedule Type'
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'scheduleId', orderable: false,
                    render: function (id: number, comp: any, entity: DeviceMake) {
                        if (entity.actionStatus == 'Approved') {
                            return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                                + '<a _ngcontent-c16 ng-reflect-router-link="/schedule/list/' + id + '/update" href="/schedule/list/' + id + '/update"><i class=\'fa fa-edit\' title=\'Edit\'></i></a>'
                                + '</div>';
                        } else {
                            return ' ';
                        }
                    }
                }
            ], 'scheduleId', params);
    }
    filterById(): void {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }
}
