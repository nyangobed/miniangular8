import {Component, Inject, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpStewardService} from '../../../../../shared/services/http-steward.service';
import {Notify} from '../../../../../shared/classes/notify';
import {AssignAction} from '../../../models/repair/assign-action';

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss']
})
export class AssignDialogComponent<T> implements OnInit {

    assignActions: AssignAction<T>;
    selectedIds: Array<any>;
    endpoint: string;
    user = [];
    @Input() assignLabel = 'Assign';

    constructor(
                public dialogRef: MatDialogRef<AssignDialogComponent<T>>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                protected stewardService: HttpStewardService<any, any>,
                protected notify: Notify
                ) {

        this.assignActions = data.assignActions;
        this.selectedIds = data.selectedIds;
        this.endpoint = data.endpoint;
        this.assignLabel = data.assignLabel;
    }

    ngOnInit() {
        const inst = this;

        this.stewardService.get('ufs-common-modules/api/v1/user/technicians').subscribe(response => {

            if (response.code === 200) {
                inst.user = response.data;
            } else {
                inst.notify.showWarning('Oops Something went wrong!');
            }
        });

    }


    onSubmit(form: NgForm) {
        const ids: Array<any> = new Array();

        $.each($('.selected', document.getElementsByTagName('table')[0]), function (index: number, row: any) {
            ids.push(parseInt($(row).attr('data-id')));
        });
        if (ids.length < 1) {
            this.notify.showWarning('Please select at least one entry');
            return;
        }
        this.assignActions.ids = ids;
        if (this.assignActions.repairModel === null) {
            this.notify.showWarning('Please select at least one Technician');
        }

        let userObject = {
            ids: [], 
            repairModel: {
                users: '',
                comments: '',
                deviceErrors: [],
                failureFound: '',
                parts: [],
                qaTest: '',
                repairCentre: '',
                repairStatus: '',
                reportedDefects: '',
        }
    };
        userObject.repairModel.users = this.assignActions.repairModel;
        userObject.ids = this.assignActions.ids;

        
        this.stewardService.put(this.endpoint + '/' + 'update', userObject).subscribe((response) => {
            if (response.code === 200) {
                this.dialogRef.close();
                this.notify.showSuccess('Technician Assigned Successfully');
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                this.resetForm(form);
            } else {
                // this.notify.showWarning(response.message);
                this.notify.showWarning('Oops Something went wrong! please try again later');
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
