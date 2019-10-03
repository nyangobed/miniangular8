import {Component, OnInit, Inject, Input, ViewChild, Renderer} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CheckerActions} from '../../entities/wrappers/checker-actions';
import {DataTableDirective} from 'angular-datatables';
import {NgForm} from '@angular/forms';
import {Notify} from '../../shared/classes/notify';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {HttpStewardService} from '../../shared/services/http-steward.service';
import {ResponseWrapper} from '../../entities/wrappers/response-wrapper';

@Component({
    selector: 'app-maker-dialog',
    templateUrl: './maker-dialog.component.html',
    styleUrls: ['./maker-dialog.component.scss']
})
export class MakerDialogComponent<T> implements OnInit {
    checkerActions: CheckerActions<T>;
    selectedIds: Array<any>;
    deleteButton = 'Delete';
    buttonLabel: string;
    endpoint: string;
    actionEndpoint: string = "/";
    addLabel = 'Add New';
    addLink = "";
    deleteLabel = 'Delete';
    datatableElement: DataTableDirective;
    dtOptions: any;
    constructor(public dialogRef: MatDialogRef<MakerDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, protected modalService: NgbModal, protected renderer: Renderer, private router: Router) {
        this.checkerActions = data.checkerActions;
        this.selectedIds = data.selectedIds;
        this.deleteButton = data.deleteButton;
        this.buttonLabel = data.buttonLabel;
        this.endpoint = data.endpoint;
        this.actionEndpoint = data.actionEndpoint;
        this.addLabel = data.addLabel;
        this.addLink = data.addLink;
        this.deleteLabel = data.deleteLabel;
        this.datatableElement = data.datatableElement;
        this.dtOptions = data.dtOptions;
    }

    ngOnInit() {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    public setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
    }


    processAction(form: NgForm) {
        this.checkerActions.ids = this.selectedIds;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        //(this.selectedIds);
        //        if (this.checkerActions.action == 'delete') {
        this.stewardService.delete(this.endpoint, this.checkerActions).subscribe((response) => {
            this.processResponse(form, response);
        });
    }
    private processResponse(form: NgForm, response: ResponseWrapper<any>) {
        if (response.code === 200) {
            this.notify.showSuccess(response.message);
            $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
            form.resetForm();
            this.dialogRef.close();
        } else {
            this.notify.showWarning(response.message);
        }
    }


}
