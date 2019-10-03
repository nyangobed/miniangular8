import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {Schedule} from "../../../entities/schedules-model";
import {Product} from "../../../entities/product-model";
import {Notify} from "../../../shared/classes/notify";

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss'],
    animations: [routerTransition()]
})
export class DownloadsComponent implements OnInit {
    public dtOptions: DataTables.Settings;
    products: Array<Product>;
    model: any = {};

    constructor(protected stewardService: HttpStewardService<any, any>, private notify: Notify) {
        this.products = new Array();
    }

    ngOnInit() {
        let inst = this;
        let params: Map<any, string> = new Map();
        params.set("sort", "productId,desc");
        params.set("actionStatus", "Approved");
        //fetch device make list
        this.stewardService.get("products", params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        params.set("sort", "scheduleId,desc")
        this.dtOptions = this.stewardService.intiateDataTable("download-reports/schedule",
            [
                {data: 'scheduleType', title: 'Schedule Type'},
                {
                    data: 'dateTime',
                    title: 'Time Created',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'scheduledTime',
                    title: 'Scheduled Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'productId.productName', title: 'Product'
                },
                {data: 'noFiles', title: 'No of Files'},
                {
                    data: 'scheduleId', title: ' ',
                    render: function (id: number, comp: any, entity: Schedule) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<a class="btn btn-primary btn-round btn-small" href="/reports/downloads/' + id + '/view"><i class=\'fa fa-eye\' title=\'View\'></i>View Tasks</a>'
                            + '</div>';
                    }
                }
            ], 'scheduleId', params);
    }
}
