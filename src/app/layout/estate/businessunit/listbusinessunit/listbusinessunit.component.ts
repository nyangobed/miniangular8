import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {BusinessItem} from "../../../../entities/param-business-unit";
import {Product} from "../../../../entities/product-model";
import {Notify} from "../../../../shared/classes/notify";

@Component({
    selector: 'app-listbusinessunit',
    templateUrl: './listbusinessunit.component.html',
    styleUrls: ['./listbusinessunit.component.scss'],
    animations: [routerTransition()]
})
export class ListbusinessunitComponent implements OnInit {
    public dtOptions: DataTables.Settings;
    selectedValue: string = "";
    products: Product[];

    constructor(protected stewardService: HttpStewardService<any, any>, protected notify: Notify) {}


    ngOnInit(): void {
        this.dtOptions = this.stewardService.intiateDataTable("business-units",
            [
                {
                    title: 'Name',
                    data: 'unitName'
                },
                {
                    data: 'levelNo', title: 'Level Number'
                },
                {
                    title: 'Created',
                    data: 'creationDate',
                    render: function (d?: number) {
                        return new Date(d).toLocaleString();
                    }

                },
                {
                    data: 'productId', title: 'Product',
                    render: (d?: Product) => {
                        return d.productName;
                    }
                },
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'unitId', title: 'Action',
                    render: function (id: number, comp: any, entity: BusinessItem) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<a _ngcontent-c16 ng-reflect-router-link="/estate/listbusinessunit/' + id + '/update" href="/estate/listbusinessunit/' + id + '/update"><i class=\'fa fa-edit\' title=\'Edit\'></i></a>&nbsp;&nbsp;&nbsp;'
                            + '<a _ngcontent-c16 ng-reflect-router-link="/estate/listbusinessunit/' + id + '/view" href="/estate/listbusinessunit/' + id + '/view"><i class=\'fa fa-eye\' title=\'View\'></i></a>'
                            + '</div>';
                    }
                }
            ], 'unitId', null, (params: any) => {
                params.productId = this.selectedValue;
            });

        let params: Map<any, string> = new Map();
        params.set("sort", "levelNo,asc");
        params.set("actionStatus", "Approved");
        params.set("sort", "productId,desc");

        let inst = this;
        //fetch device make list
        this.stewardService.get("products", params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }
    updateContent() {
        $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
    }

}
