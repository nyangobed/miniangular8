import {Component, OnInit, Input} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Notify} from "../../../../shared/classes/notify";
import {Product} from "../../../../entities/product-model";

@Component({
    selector: 'app-approve',
    templateUrl: './approve.component.html',
    styleUrls: ['./approve.component.scss'],
    animations: [routerTransition()]
})
export class ApproveComponent implements OnInit {
    @Input() dtOptions: DataTables.Settings;
    products: Product[];
    selectedValue: any = {};

    constructor(protected stewardService: HttpStewardService<any, any>, protected notify: Notify) {}


    ngOnInit(): void {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
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
                {data: 'actionStatus', title: 'Action Status'}
            ], 'unitId', null, (params: any) => {
                params.productId = this.selectedValue;
            });


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
