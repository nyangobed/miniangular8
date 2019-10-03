import {Component, OnInit, Renderer, AfterViewInit} from '@angular/core';
import {routerTransition} from "../../../router.animations";
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {Department} from "../../../entities/department-model";
import {Notify} from "../../../shared/classes/notify";
import {Router} from "@angular/router";

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
    animations: [routerTransition()]
})
export class DepartmentComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Department, Department>, protected notify: Notify, protected renderer: Renderer, public router: Router) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('departments',
            [
                {
                    data: 'departmentId',
                    render: function (d: any) {
                        return "";
                    }
                },
                {
                    data: 'departmentName'
                }, {
                    data: 'description'
                }, {
                    data: 'creationDate',
                    render: function (d?: number) {
                        return new Date(d).toLocaleString();
                    }
                }, {
                    data: 'action'
                }, {
                    data: 'actionStatus'
                },
                {
                    data: 'departmentId',
                    orderable: false,
                    render: function (id: number, comp: any, entity: Department) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                            + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'departmentId', params);
    }
    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate(["/masterrecords/departments/" + event.target.getAttribute("edit-config-id") + "/update"]);
            }

            if (event.target.hasAttribute("view-config-id")) {
                this.router.navigate(["/masterrecords/departments/" + event.target.getAttribute("view-config-id") + "/view"]);

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
