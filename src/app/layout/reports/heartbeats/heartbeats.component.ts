import {Component, OnInit, Renderer, ViewChild, ElementRef} from '@angular/core';
import {HttpStewardService} from "../../../shared/services/http-steward.service";
import {HeartBeats} from "../../../entities/heartbeats-model";
import {routerTransition} from "../../../router.animations";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViewParamBase} from "../../../shared/base/viewParamBase";
import {Notify} from "../../../shared/classes/notify";
import {DataTableDirective} from "angular-datatables";

@Component({
    selector: 'app-heartbeats',
    templateUrl: './heartbeats.component.html',
    styleUrls: ['./heartbeats.component.scss'],
    animations: [routerTransition()]
})
export class HeartbeatsComponent implements OnInit {
    public dtOptions: DataTables.Settings;
    serialNo: string;
    modal: NgbModalRef;
    viewparam: Array<ViewParamBase>;
    objectKeys = Object.keys;
    @ViewChild('content') content: ElementRef;
    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;

    constructor(protected stewardService: HttpStewardService<HeartBeats, HeartBeats>, protected notify: Notify, protected modalService: NgbModal, protected renderer: Renderer) {
        this.viewparam = new Array();
    }

    ngOnInit(): void {

        $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
            const serialNo = data[0] || ""; // use data for the id column
            if (this.serialNo == serialNo) {
                return true;
            }
            return false;
        });


        let params: Map<any, string> = new Map();
        params.set("sort", "logId,desc")
        this.dtOptions = this.stewardService.intiateDataTable("heart-beat",
            [
                {data: 'serialNo', title: 'Serial No'},
                {
                    data: 'creationDate',
                    title: 'Heartbeat Time',
                    render: (d?: number) => {
                        return new Date(d).toLocaleString();
                    }
                },
                {
                    data: 'batteryPercentage', title: 'Battery Percentage',
                    render: function (val: any) {
                        return val + '%';
                    }
                },
                {
                    data: 'chargingStatus', title: 'Charging Status',
                    render: (d?: any) => {
                        if (d == '1') {
                            return 'Yes';
                        } else {
                            return 'No';
                        }
                    }
                },
                {data: 'osVersion', title: 'OS Version'},
                {
                    data: 'logId', title: 'Action',
                    render: function (id: number, comp: any, entity: HeartBeats) {
                        return "<div class='actions-buttons center'>"
                            + "<i (click)=\"viewDetails()\" class='fa fa-eye' title='View' data-config-id='" + id + "'></i></div>";
                    }
                }
            ], 'logId', null, (params: any) => {
                params.serialNo = this.serialNo;
            });
    }

    ngAfterViewInit() {
        let inst = this;
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("data-config-id")) {
                this.stewardService.get("heart-beat/id/" + event.target.getAttribute("data-config-id")).subscribe(response => {
                    if (response.code == 200) {
                        let order: number = 1;
                        inst.viewparam = new Array();
                        for (let data of inst.objectKeys(response.data)) {
                            if (response.data[data] != '' && (typeof response.data[data]) != 'object') {
                                inst.viewparam.push({
                                    value: response.data[data],
                                    label: data.toLowerCase(),
                                    order: order,
                                });
                            }
                            order++;
                        }
                        this.modal = this.modalService.open(this.content);
                    } else {
                        this.notify.showWarning(response.message);
                    }
                })
            }
        });
    }

    updateContent() {
        //$($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    ngOnDestroy(): void {
        // We remove the last function in the global ext search array so we do not add the fn each time the component is drawn
        // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
        // handling this global variable
        $.fn['dataTable'].ext.search.pop();
    }

    filterById(): void {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    viewDetails() {
        //("Clicked..");
        this.viewparam = new Array();

        /*let inst = this;
        let order: number = 1;
        for (let data of inst.objectKeys(entity)) {
            if (entity[data] != '' && (typeof entity[data]) != 'object') {
                inst.viewparam.push({
                    value: entity[data],
                    label: data.toLowerCase(),
                    order: order,
                });
            }
            order++;
        }*/
    }
}
