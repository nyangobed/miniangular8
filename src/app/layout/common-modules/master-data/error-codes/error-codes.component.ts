import { Location } from "@angular/common";
import { Component, OnInit, AfterViewInit, Renderer } from "@angular/core";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Notify } from "../../../../shared/classes/notify";
import { Router } from "@angular/router";
import { routerTransition } from "../../../../router.animations";
import { ErrorCodes } from "../../../../entities/error-codes-model";
import { GlobalParams } from "../../../../shared/services/globalparams";

@Component({
    selector: "app-error-codes",
    templateUrl: "./error-codes.component.html",
    styleUrls: ["./error-codes.component.scss"],
    animations: [routerTransition()]
})
export class ErrorCodesComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(
        protected stewardService: HttpStewardService<ErrorCodes, ErrorCodes>,
        protected notify: Notify,
        protected renderer: Renderer,
        private globalParam: GlobalParams,
        public router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable(
            "atlas/device_error",
            [
                {
                    data: "code",
                    render: (d?: any) => ""
                },
                {
                    title: "Code",
                    data: "code"
                },
                {
                    title: "Code Name",
                    data: "codeName"
                },
                {
                    title: "Level",
                    data: "level"
                },

                {
                    title: "Description",
                    data: "description"
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
                    data: "error_id",
                    title: "Action",
                    orderable: false,
                    render: function(
                        id: number,
                        comp: any,
                        entity: ErrorCodes
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
            "error_id",
            params
        );
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal("document", "click", event => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate([
                    "/common-modules/master-data/error-codes/create-error-codes/" +
                        event.target.getAttribute("edit-config-id") +
                        "/update"
                ]);
            }

            if (event.target.hasAttribute("view-config-id")) {
                this.router.navigate([
                    "/common-modules/master-data/error-codes/view-error-codes/" +
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


    downloadFile() {
        window.location.href = this.globalParam.baseUrl + 'atlas/device_error/sampleFile';
    }

    goBack() {
        this.location.back();
    }
}
