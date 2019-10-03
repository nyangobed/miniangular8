import {Component, Inject, OnInit, Renderer} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Router} from '@angular/router';
import {Notify} from '../../../../shared/classes/notify';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CheckerActions} from '../../../../entities/wrappers/checker-actions';
import {NgForm} from '@angular/forms';
import {ResponseWrapper} from '../../../../entities/wrappers/response-wrapper';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent<T> implements OnInit {
    checkerActions: CheckerActions<any>;
    selectedIds: Array<any>;
    deleteLabel = 'Delete';
    endpoint: string;
    addLabel = 'Add';
    approveLabel = 'Approve';
    approveLink: string;
    addLink: string;

    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent<T>>,
         @Inject(MAT_DIALOG_DATA) public data: any,
          protected stewardService: HttpStewardService<any, any>,
           protected notify: Notify, protected modalService: NgbModal, 
           protected renderer: Renderer, private router: Router) {
    // tslint:disable-next-line:max-line-length

        this.checkerActions = data.checkerActions;
        this.selectedIds = data.selectedIds;
        this.endpoint = data.endpoint;
        this.addLabel = data.addLabel;
        this.addLink = data.addLink;
        this.deleteLabel = data.deleteLabel;
        this.approveLink = data.approveLink;
        this.approveLabel = data.approveLabel;
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
        //(this.checkerActions);
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
