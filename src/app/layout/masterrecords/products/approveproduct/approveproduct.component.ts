import {Component, OnInit, AfterViewInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Product} from "../../../../entities/product-model";
import {Notify} from "../../../../shared/classes/notify";

@Component({
    selector: 'app-approveproduct',
    templateUrl: './approveproduct.component.html',
    styleUrls: ['./approveproduct.component.scss'],
    animations: [routerTransition()]
})
export class ApproveproductComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Product, Product>, protected notify: Notify) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved")
        this.dtOptions = this.stewardService.intiateDataTable('products',
            [
                {

                    data: 'productId',
                    render: (d?: number) => {
                        return "";
                    }
                },
                {
                    data: 'productName'
                },
                {
                    data: 'description'
                },
                {
                    data: 'creationDate',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                }
                ,
                {
                    data: 'status'
                },
                {
                    data: 'action'
                },
                {
                    data: 'actionStatus'
                },
                {
                    data: 'productId',
                    render: function (id: number, comp: any, entity: Product) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                            + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'productId', params);
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
