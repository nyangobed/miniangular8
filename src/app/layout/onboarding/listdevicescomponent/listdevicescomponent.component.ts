import {Component, OnInit, AfterViewInit, Renderer, ViewChild} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Devices} from '../../../entities/devices-list-model';
import {DeviceModel} from '../../../entities/device-model';
import {BusinessUnitItem} from '../../../entities/param-business-unit-item-model';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Notify} from '../../../shared/classes/notify';

@Component({
    selector: 'app-listdevicescomponent',
    templateUrl: './listdevicescomponent.component.html',
    styleUrls: ['./listdevicescomponent.component.scss'],
    animations: [routerTransition()]
})
export class ListdevicescomponentComponent implements OnInit, AfterViewInit {
    public dtOptions: DataTables.Settings;
    public model: ReleaseEntity = new ReleaseEntity([], '', 'Repair');
    @ViewChild('releaseContent') releaseContent: any;
    public releaseId: number;
    public modal: NgbModalRef;

    constructor(protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, protected modalService: NgbModal, protected notify: Notify, private router: Router) {
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        this.dtOptions = this.stewardService.intiateDataTable('devices',
            [
                {data: 'partNumber', render: (d?: any) => ''},
                {data: 'serialNo', title: 'Serial Number'},
                {
                    data: 'modelId', title: 'Model',
                    render: (d?: DeviceModel) => {
                        return d.model;
                    }
                },
                {data: 'merchantName', title: 'Merchant Name', orderable: false},
                {data: 'action', title: 'Action'},
                {data: 'actionStatus', title: 'Action Status'},
                {
                    data: 'deviceId', orderable: false,
                    render: function (id: number, comp: any, entity: Devices) {
                        return '<div class=\'actions-buttons center\' id=\'' + id + '\'>'
                            + '<i class=\'fa fa-eye pointer\' title=\'View\' edit-config-id="' + id + '"></i>'
                            + '</div>';
                    }
                }
            ], 'deviceId', params);
    }

    ngAfterViewInit() {
        const sp = this;
        const table = document.getElementById('list-device-table');
        table.onselect = function (event: Event) {
            sp.model.ids = new Array();
            $.each($('.selected', table), function (index: number, row: any) {
                sp.model.ids.push(+$(row).attr('data-id'));
            });
        };
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('edit-config-id')) {
                this.router.navigate(['/devices/list/' + event.target.getAttribute('edit-config-id') + '/update']);
            }
        });
        $('.select-all-checkbox').click(function () {
            if ($(this).is(':checked')) {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().select();
            } else {
                //@ts-ignore
                $($.fn.dataTable.tables(true)).DataTable().rows().deselect();
            }
        });
    }

    open(content: any) {
        this.modal = this.modalService.open(content);
    }

    processRelease(form: NgForm) {
        this.stewardService.put('devices/release', this.model).subscribe(response => {
            if (response.code == 200) {
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                form.resetForm();
                this.modal.close();
                this.notify.showSuccess(response.message);
                //                 this.router.navigate(["/devices/release"]);
            } else {
                if (response.data != null) {
                    let msg = '';
                    for (const m of response.data) {
                        msg += m + '\n';
                    }
                    this.notify.showWarning(msg);
                } else {
                    this.notify.showWarning(response.message);
                }
            }
        });
    }

    processDecommission(form: NgForm) {
        this.stewardService.delete('devices', this.model).subscribe(response => {
            if (response.code == 200) {
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                form.resetForm();
                this.modal.close();
                this.notify.showSuccess(response.message);
                //                 this.router.navigate(["/devices/release"]);
            } else {
                if (response.data != null) {
                    let msg = '';
                    for (const m of response.data) {
                        msg += m + '\n';
                    }
                    this.notify.showWarning(msg);
                } else {
                    this.notify.showWarning(response.message);
                }
            }
        });
    }

}

class ReleaseEntity {
    ids: Array<number>;
    notes: string;
    status: string;

    constructor(ids: Array<number>, notes: string, status: string) {
        this.ids = ids;
        this.notes = notes;
        this.status = status;

    }
}
