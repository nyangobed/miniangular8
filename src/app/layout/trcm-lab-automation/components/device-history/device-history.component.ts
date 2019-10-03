import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../../../router.animations";
import { DeviceHistoryWrapper } from "../../../../entities/wrappers/device-history-wrapper";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Notify } from "../../../../shared/classes/notify";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DeviceModel } from "../../../../entities/device-model";
import { Devices } from "../../../../entities/devices-list-model";

@Component({
    selector: "app-device-history",
    templateUrl: "./device-history.component.html",
    styleUrls: ["./device-history.component.scss"],
    animations: [routerTransition()]
})
export class DeviceHistoryComponent implements OnInit {
    model: DeviceHistoryWrapper;
    public dtOptions: DataTables.Settings;
    displayview: boolean = false;

    constructor(
        private stewardService: HttpStewardService<any, any>,
        private notify: Notify,
        private route: ActivatedRoute
    ) {
        this.model = new DeviceHistoryWrapper();
    }

    ngOnInit() {}

    onQueryHistory(form: NgForm) {
        let params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable(
            "atlas/repair/serialnumber/" + this.model.serialNo,
            [
                {
                    data: "Id",
                    render: (d?: any) => ""
                },
                {
                    title: "Serial Number",
                    data: "devices",
                    render: function(data: any) {
                        return data ? data.serialnumber : "";
                    }
                },
                {
                    title: "Customer",
                    data: "devices",
                    render: function(data: any) {
                        return data ? data.deviceowner : "";
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
                    title: "Device Errors",
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
                    title: "Parts",
                    data: "parts",
                    render: function(data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.partNumber).join(", ");
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
                    }
                },
                {
                    title: "Repaired By",
                    data: "users",
                    render: function(data: Array<any>) {
                        if (data != null) {
                            try {
                                return data.map(s => s.fullName).join(", ");
                            } catch (e) {
                                return data;
                            }
                        }
                        return data;
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
            "Id",
            params
        );
        this.displayview = true;
    }
}
