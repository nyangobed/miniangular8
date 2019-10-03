import { Component, OnInit, Renderer, AfterViewInit } from "@angular/core";
import { routerTransition } from "../../../../router.animations";
import { Notify } from "../../../../shared/classes/notify";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Users } from "../../../../entities/users-model";
import { Router } from "@angular/router";
import { CreateUserWrapper } from "../../../../entities/wrappers/create-user-wrapper";
import { Location } from "@angular/common";

@Component({
    selector: "app-listusers",
    templateUrl: "./listusers.component.html",
    styleUrls: ["./listusers.component.scss"],
    animations: [routerTransition()]
})
export class ListusersComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(
        protected stewardService: HttpStewardService<
            CreateUserWrapper,
            CreateUserWrapper
        >,
        protected notify: Notify,
        protected renderer: Renderer,
        public router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable(
            "ufs-common-modules/api/v1/user",
            [
                {
                    data: "name",
                    render: (d?: number) => {
                        return "";
                    }
                },
                { data: "fullName" },
                { data: "email" },
                { data: "phoneNumber" },
                { data: "gender.gender" },
                { data: "userType.userType" },
                { data: "actionStatus" },
                {
                    data: "creationDate",
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: "userId",
                    title: 'Action',
                    orderable: false,
                    render: function(
                        id: number,
                        comp: any,
                        entity: CreateUserWrapper
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
            "userId",
            params
        );
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal("document", "click", event => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate([
                    "/common-modules/users/" +
                        "" +
                        event.target.getAttribute("edit-config-id") +
                        "/update"
                ]);
            }

            if (event.target.hasAttribute("view-config-id")) {
                this.router.navigate([
                    "common-modules/users/" +
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
        this.location.back();
    }
}
