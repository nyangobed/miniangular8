import { Component, OnInit, AfterViewInit } from "@angular/core";
import { routerTransition } from "../../../../router.animations";
import { HttpStewardService } from "../../../../shared/services/http-steward.service";
import { Roles } from "../../../../entities/roles-modules";
import { Location } from "@angular/common";
@Component({
    selector: "app-approveuserrole",
    templateUrl: "./approveuserrole.component.html",
    styleUrls: ["./approveuserrole.component.scss"],
    animations: [routerTransition()]
})
export class ApproveuserroleComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(
        protected stewardService: HttpStewardService<Roles, Roles>,
        private location: Location
    ) {}

    ngOnInit() {
        let params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved");
        this.dtOptions = this.stewardService.intiateDataTable(
            "ufs-common-modules/api/v1/role",
            [
                { data: "roleName", render: (d?: any) => "" },
                { data: "roleName", title: "Name" },
                { data: "description", title: "User Role" },
                {
                    data: "creationDate",
                    title: "Created",
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },

                { data: "actionStatus", title: "Action Status" }
                // {
                //     data: 'roleId', title: 'Action', orderable: false,
                //     render: function (id: number, comp: any, entity: Roles) {
                //         if (entity.action === 'Update') {
                //             return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                //                 // tslint:disable-next-line:max-line-length
                //                 + '<a _ngcontent-c16 ng-reflect-router-link="/roles/list/' + id + '/update" href="/roles/list/' + id + '/update"><i class=\'fa fa-edit\' title=\'Edit\'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                //                 // tslint:disable-next-line:max-line-length
                //                 + '<a _ngcontent-c16 ng-reflect-router-link="/roles/list/' + id + '/view" href="/roles/list/' + id + '/view"><i class=\'fa fa-eye\' title=\'View\'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                //                 // tslint:disable-next-line:max-line-length
                //                 + '<a _ngcontent-c16 ng-reflect-router-link="/roles/list/' + id + '/view" href="/roles/list/' + id + '/changes"><i class=\'fa fa-exchange\' title=\'View Changes\'></i></a>'
                //                 + '</div>';
                //         } else {
                //             return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                //                 // tslint:disable-next-line:max-line-length
                //                 + '<a _ngcontent-c16 ng-reflect-router-link="/roles/list/' + id + '/update" href="/roles/list/' + id + '/update"><i class=\'fa fa-edit\' title=\'Edit\'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                //                 + '<a _ngcontent-c16 ng-reflect-router-link="/roles/list/' + id + '/view" href="/roles/list/' + id + '/view"><i class=\'fa fa-eye\' title=\'View\'></i></a>'
                //                 + '</div>';
                //         }
                //     }
                // }
            ],
            "roleId",
            params
        );
    }

    ngAfterViewInit(): void {
        // $('.select-all-checkbox').click(function () {
        //     if ($(this).is(':checked')) {
        //         //@ts-ignore
        //         $($.fn.dataTable.tables(true)).DataTable().rows().select();
        //     } else {
        //         //@ts-ignore
        //         $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
        //     }
        // });
    }
    goBack() {
        // window.history.back();
        this.location.back();

        // //( 'goBack()...' );
    }
}
