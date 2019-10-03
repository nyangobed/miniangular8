import {Component, OnInit, Inject} from '@angular/core';
import {CheckerActions} from '../../../entities/wrappers/checker-actions';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-checker-dialog',
    templateUrl: './checker-dialog.component.html',
    styleUrls: ['./checker-dialog.component.scss']
})
export class CheckerDialogComponent<T> implements OnInit {

    checkerActions: CheckerActions<any>;
    formGroup: FormGroup;
    selectedIds: Array<any>;
    endpoint: string;
    approveLabel: string = 'Approve';
    declineLabel: string = 'Decline';

    constructor(public dialogRef: MatDialogRef<CheckerDialogComponent<T>>,
         @Inject(MAT_DIALOG_DATA) public data: any,
         protected stewardService: HttpStewardService<any, any>,
          protected notify: Notify) {
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
        const ids: Array<any> = new Array();
        $.each($('.selected', document.getElementsByTagName('table')[0]), function (index: number, row: any) {
            ids.push($(row).attr('data-id'));
        });
        if (ids.length < 1) {
            this.notify.showWarning('Please select atleast one entry');
            return;
        }
        this.checkerActions.ids = ids;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        this.stewardService.put(this.endpoint + '/' + this.checkerActions.action.toLowerCase() + '-actions', this.checkerActions).subscribe((response) => {
            if (response.code === 200) {
                this.dialogRef.close();
                this.notify.showSuccess(response.message);
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
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
