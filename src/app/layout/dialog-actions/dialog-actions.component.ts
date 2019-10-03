import {Component, OnInit, Inject} from '@angular/core';
import {CheckerActions} from '../../entities/wrappers/checker-actions';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpStewardService} from '../../shared/services/http-steward.service';
import {Notify} from '../../shared/classes/notify';

@Component({
    selector: 'app-dialog-actions',
    templateUrl: './dialog-actions.component.html',
    styleUrls: ['./dialog-actions.component.scss']
})
export class DialogActionsComponent<T> implements OnInit {
    checkerActions: CheckerActions<any>;
    formGroup: FormGroup;
    selectedIds: Array<any>;
    endpoint: string;
    approveLabel: string = "Approve";
    declineLabel: string = "Decline";

    constructor(public dialogRef: MatDialogRef<DialogActionsComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify) {
        this.checkerActions = data.checkerActions;
        this.selectedIds = data.selectedIds;
        this.formGroup = data.formGroup;
        this.endpoint = data.endpoint;
        this.approveLabel = data.approveLabel;
        this.declineLabel = data.declineLabel;
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            action: new FormControl()
        });
    }


    approve(form: NgForm) {
        this.checkerActions.ids = this.selectedIds;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        this.stewardService.put(this.endpoint + '/' + this.checkerActions.action.toLowerCase() + '-actions', this.checkerActions).subscribe((response) => {
            //(response);
            if (response.code === 200) {
                this.dialogRef.close();
                this.notify.showSuccess(response.message);
                //$($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                this.resetForm(form);
            } else {
                this.notify.showWarning(response.message);
            }
            form.resetForm();
        });
    }
    resetForm(form: NgForm) {
        form.resetForm();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
