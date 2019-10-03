import { Component, OnInit, Renderer } from "@angular/core";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Currency } from "../../../../entities/currency-model";
import { Notify } from "../../../../shared/classes/notify";
import { Router } from "@angular/router";
import { routerTransition } from "../../../../router.animations";
import { BankRegions } from "../../../../entities/bank-regions-model";
import { Location } from "@angular/common";
@Component({
    selector: "app-bank-regions",
    templateUrl: "./bank-regions.component.html",
    styleUrls: ["./bank-regions.component.scss"],
    animations: [routerTransition()]
})
export class BankRegionsComponent implements OnInit {
    dtOptions: DataTables.Settings = {};

    constructor(
        protected stewardService: HttpStewardService<BankRegions, BankRegions>,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable(
            "atlas/bank_regions",
            [
                {
                    data: "name",
                    render: (d?: any) => ""
                },

                {
                    title: "Branch Name",
                    data: "branchName"
                },

                {
                    title: "Code",
                    data: "code"
                },
                {
                    title: "Created On",
                    data: "createdOn"
                },
                {
                    title: "Action Status",
                    data: "actionStatus"
                },
                {
                    data: "bankRegions_id",
                    title: "Action",
                    orderable: false,
                    render: function(
                        id: number,
                        comp: any,
                        entity: BankRegions
                    ) {
                        return (
                            "<div class='actions-buttons center' id='" +
                            id +
                            "'>" +
                            "<i class='fa fa-edit pointer' title='Edit' edit-config-id=\"" +
                            id +
                            '"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
                            "<i class='fa fa-eye pointer' title='View' view-config-id=\"" +
                            id +
                            '"></i>' +
                            "</div>"
                        );
                    }
                }
            ],
            "bankRegions_id",
            params
        );
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.renderer.listenGlobal("document", "click", event => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate([
                    "/common-modules/master-data/bank-regions/" +
                        event.target.getAttribute("edit-config-id") +
                        "/update"
                ]);
            }

            if (event.target.hasAttribute("view-config-id")) {
                this.router.navigate([
                    "/common-modules/master-data/bank-regions/" +
                        event.target.getAttribute("view-config-id") +
                        "/view"
                ]);
            }
        });

        $(".select-all-checkbox").click(function() {
            if ($(this).is(":checked")) {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                // @ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }
    goBack() {
        // window.history.back();
        this.location.back();

        // //( 'goBack()...' );
    }
}
