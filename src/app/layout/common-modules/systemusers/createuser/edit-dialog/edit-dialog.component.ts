import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {CheckerActions} from '../../../../../entities/wrappers/checker-actions';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {CreateUserWrapper} from '../../../../../entities/wrappers/create-user-wrapper';
import {PasswordReset} from '../../../../../entities/wrappers/reset-password-wrapper';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent<T> implements OnInit {
    @Input() checkerActions: CheckerActions<any>;

    @Input() lockLabel = 'Lock';
    @Input() unlockLabel = 'Unlock';
    @Input() activateLabel = 'Activate';
    @Input() deactivateLabel = 'Deactivate';
    @Input() resetLabel = 'Reset Password';
    model: CreateUserWrapper;
    reset: PasswordReset;
    formGroup: FormGroup;

    constructor(public dialogRef: MatDialogRef<EditDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify) {
        this.reset = new PasswordReset();
        this.checkerActions = data.checkerActions;
        this.lockLabel = data.lockLabel;
        this.unlockLabel = data.unlockLabel;
        this.activateLabel = data.activateLabel;
        this.deactivateLabel = data.deactivateLabel;
        this.resetLabel = data.resetLabel;
        this.model = data.model;
        this.formGroup = data.formGroup;

    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            action: new FormControl()
        });
    }

    resetForm(form: NgForm): void {
        form.resetForm();
    }

    approve(form: NgForm) {
        const ids: Array<any> = new Array();
        ids.push(this.model.userId);

        this.checkerActions.ids = ids;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        if (this.checkerActions.action == 'Reset Password') {
            this.reset.email = this.model.email;
            this.stewardService.postFormData('ufs-commom-modules/api/v1/reset-password', this.reset).subscribe((response) => {
                // //(response);
                if (response.code === 200) {
                    this.dialogRef.close();
                    this.notify.showSuccess(response.message);
                    $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                    form.resetForm();
                } else {
                    this.notify.showWarning(response.message);
                }
            });
        } else {
            this.stewardService.put('ufs-common-modules/api/v1/users/' + this.checkerActions.action.toLowerCase(), this.checkerActions).subscribe((response) => {
                if (response.code === 200) {
                    this.dialogRef.close();
                    this.notify.showSuccess(response.message);
                    $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                    form.resetForm();
                } else {
                    this.notify.showWarning(response.message);
                }
            });
        }
    }
}
