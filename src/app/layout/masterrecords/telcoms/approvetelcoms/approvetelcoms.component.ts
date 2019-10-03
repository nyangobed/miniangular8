import {Component, OnInit, Renderer} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {HttpStewardService} from "../../../../shared/services/http-steward.service";
import {Telco} from "../../../../entities/telcos-model";
import {Notify} from "../../../../shared/classes/notify";
import {Router} from "@angular/router";

@Component({
    selector: 'app-approvetelcoms',
    templateUrl: './approvetelcoms.component.html',
    styleUrls: ['./approvetelcoms.component.scss'],
    animations: [routerTransition()]
})
export class ApprovetelcomsComponent implements OnInit {

    dtOptions: DataTables.Settings = {};

    constructor(protected stewardService: HttpStewardService<Telco, Telco>, protected notify: Notify, protected renderer: Renderer, public router: Router) {
    }

    ngOnInit(): void {
        const params: Map<any, string> = new Map();
        params.set("actionStatus", "Unapproved")
        this.dtOptions = this.stewardService.intiateDataTable('mno',
            [
                {
                    data: 'mnoName', render: (d?: any) => ''
                },
                {
                    title: 'Name',
                    data: 'mnoName'
                }, {
                    title: 'Description',
                    data: 'description'
                }, {
                    title: 'Action',
                    data: 'action'
                }, {
                    title: 'Action Status',
                    data: 'actionStatus'
                },
                {
                    data: 'mnoId', title: 'Action', orderable: false,
                    render: function (id: number, comp: any, entity: Telco) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-edit pointer\' title=\'Edit\' edit-config-id="' + id + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;'
                            + '<i class=\'fa fa-eye pointer\' title=\'View\' view-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'mnoId', params);
    }

    ngAfterViewInit() {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate(["/masterrecords/telcoms/" + event.target.getAttribute("edit-config-id") + "/update"]);
            }

            if (event.target.hasAttribute("view-config-id")) {
                this.router.navigate(["/masterrecords/telcoms/" + event.target.getAttribute("view-config-id") + "/view"]);

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
