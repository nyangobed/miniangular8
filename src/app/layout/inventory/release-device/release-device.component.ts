import {Component, OnInit, Renderer, ViewChild, AfterViewInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Notify} from '../../../shared/classes/notify';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ReleaseDialogComponent} from '../release-dialog/release-dialog.component';
import {ReleaseEntity} from '../../../entities/release-entity';

@Component({
    selector: 'app-release-device',
    templateUrl: './release-device.component.html',
    styleUrls: ['./release-device.component.scss'],
    animations: [routerTransition()]
})
export class ReleaseDeviceComponent implements OnInit, AfterViewInit {
    public model: ReleaseEntity = new ReleaseEntity([], "", "Repair");
    @ViewChild('releaseContent') releaseContent: any;
    public releaseId: number;
    public modal: NgbModalRef;

    constructor(public dialog: MatDialog, protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, protected modalService: NgbModal, protected notify: Notify, private router: Router) {
        this.model = new ReleaseEntity([], "", "Repair");
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const sp = this;
        const table = document.getElementById('list-device-table');
        table.onselect = function (event: Event) {
            sp.model.ids = new Array();
            $.each($(".selected", table), function (index: number, row: any) {
                sp.model.ids.push(+$(row).attr("data-id"));
            });
        }
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute("edit-config-id")) {
                this.router.navigate(["/devices/list/" + event.target.getAttribute("edit-config-id") + "/update"]);
            }
        });
    }

    open(content: any) {
        /*this.modal = this.modalService.open(content);*/
        let dialogRef = this.dialog.open(ReleaseDialogComponent, {
            width: '500px',
            data: {
                model: this.model,
                releaseContent: this.releaseContent,
                releaseId: this.releaseId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            //('The dialog was closed');
        });
    }


    processRelease(form: NgForm) {
        this.stewardService.put("devices/release", this.model).subscribe(response => {
            if (response.code == 200) {
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                form.resetForm();
                this.modal.close();
                this.notify.showSuccess(response.message);
                //                 this.router.navigate(["/devices/release"]);
            } else {
                if (response.data != null) {
                    let msg: string = "";
                    for (let m of response.data) {
                        msg += m + "\n";
                    }
                    this.notify.showWarning(msg);
                } else {
                    this.notify.showWarning(response.message);
                }
            }
        });
    }
}
