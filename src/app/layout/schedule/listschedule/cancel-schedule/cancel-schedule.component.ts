import {Component, Inject, OnInit, Renderer} from '@angular/core';
import {CheckerActions} from '../../../../entities/wrappers/checker-actions';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Notify} from '../../../../shared/classes/notify';
import {ResponseWrapper} from '../../../../entities/wrappers/response-wrapper';

@Component({
    selector: 'app-cancel-schedule',
    templateUrl: './cancel-schedule.component.html',
    styleUrls: ['./cancel-schedule.component.scss']
})
export class CancelScheduleComponent<T> implements OnInit {
    checkerActions: CheckerActions<any>;
    selectedIds: Array<any>;
    deleteLabel = 'Cancel';
    endpoint: string;
    addLabel = 'Add';
    approveLabel = 'Approve';
    approveLink: string;
    addLink: string;


    constructor(public dialogRef: MatDialogRef<CancelScheduleComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, protected renderer: Renderer, private router: Router) {
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
        this.checkerActions.ids = this.selectedIds;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        //(this.checkerActions);
        this.stewardService.put(this.endpoint, this.checkerActions).subscribe((response) => {
            this.processResponse(form, response);
        });
    }

    private processResponse(form: NgForm, response: ResponseWrapper<any>) {
        //(response);
        if (response.code === 200) {
            this.notify.showSuccess(response.message);
            // $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
            form.resetForm();
            this.dialogRef.close();
        } else {
            this.notify.showWarning(response.message);
        }
    }

}
