import {Component, OnInit, Renderer, AfterViewInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {Notify} from "../../../shared/classes/notify";
import {Product} from "../../../entities/product-model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    animations: [routerTransition()]
})
export class ProductsComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Product, Product>, protected notify: Notify, protected renderer: Renderer, public router: Router) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
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
                }, {
                    data: 'description'
                }, {
                    data: 'creationDate',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                }
                , {
                    data: 'status'
                }, {
                    data: 'action'
                }, {
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

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate(["/masterrecords/products/" + event.target.getAttribute("edit-config-id") + "/update"]);
            }

            if (event.target.hasAttribute("view-config-id")) {
                this.router.navigate(["/masterrecords/products/" + event.target.getAttribute("view-config-id") + "/view"]);

            }
        });
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
