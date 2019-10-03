import { Component, OnInit, Renderer } from "@angular/core";
import { routerTransition } from "../../../../../router.animations";
import { Notify } from "../../../../../shared/classes/notify";
import { Router } from "@angular/router";
import { Repair } from "../../../models/repair/repair";
import { Location } from "@angular/common";
import { HttpStewardService } from "../../../../../shared/services/http-steward.service";

@Component({
    selector: "app-approve-diagnosis",
    templateUrl: "./approve-diagnosis.component.html",
    styleUrls: ["./approve-diagnosis.component.scss"],
    animations: [routerTransition()]
})
export class ApproveDiagnosisComponent implements OnInit {
    dtOptions: any = {};

    constructor(
        protected notify: Notify,
        protected renderer: Renderer,
        private httpStewardService: HttpStewardService<any, any>,
        public router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        const params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
        this.dtOptions = this.httpStewardService.intiateDataTable(
            "atlas/repair",

            [
                {
                    data: "id",
                    render: (d?: any) => ""
                },
                {
                    title: "Batch",
                    data: "batchNumber",
                    render: function(data) {
                        return data ? data : "";
                    }
                },
                {
                    title: "Serial Number",
                    data: "devices",
                    render: function(data) {
                        return data ? data.serialnumber : "";
                    }
                },
                {
                    title: "Part Number",
                    data: "devices",
                    render: function(data) {
                        return data ? data.partnumber : "";
                    }
                },
                {
                    title: "IMEI",
                    data: "devices",
                    render: function(data) {
                        return data ? data.imeinumber : "";
                    }
                },
                {
                    title: "Client",
                    data: "devices",
                    render: function(data) {
                        return data ? data.deviceowner : "";
                    }
                },
                {
                    title: "Reported Defect",
                    data: "reportedDefects",
                    render: function(data) {
                        return data ? data : "";
                    }
                },
                {
                    title: "Failure Found",
                    data: "deviceErrors",
                    render: function(data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.code).join(" ");
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
                    }
                },
                {
                    title: "Device Level",
                    data: "levels",
                    render: function(data) {
                        return data ? data : "";
                    }
                },
                {
                    title: "Parts",
                    data: "parts",
                    render: function(data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.partName).join(", ");
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
                    }
                },
                {
                    title: "Repair Centre",
                    data: "repairCentre",
                    render: function(data) {
                        return data ? data : "";
                    }
                },
                {
                    title: "Comment",
                    data: "comments",
                    render: function(data) {
                        return data ? data : "";
                    }
                },
                {
                    title: "Received Date",
                    data: "createdOn",
                    render: function(data) {
                        return data ? data : "";
                    }
                },
                {
                    title: "Action Status",
                    data: "actionStatus",
                    render: function(data) {
                        return data ? data : "";
                    }
                }
            ],
            "id",
            params
        );
    }

    ngAfterViewInit() {
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

    /** REDIRECT THE PAGE */
    goBack() {
        // window.history.back();
        this.location.back();
    }
}
