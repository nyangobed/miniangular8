import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {Schedule} from "../../../entities/schedules-model";
import {Notify} from "../../../shared/classes/notify";
import {Product} from "../../../entities/product-model";

@Component({
    selector: 'app-approveschedule',
    templateUrl: './approveschedule.component.html',
    styleUrls: ['./approveschedule.component.scss'],
    animations: [routerTransition()]
})
export class ApprovescheduleComponent implements OnInit, AfterViewInit {
    @Input() dtOptions: DataTables.Settings;

    constructor(protected stewardService: HttpStewardService<Schedule, Schedule>, protected notify: Notify) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
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
                {data: 'actionStatus', title: 'Action Status'}
            ], 'scheduleId', params);
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
