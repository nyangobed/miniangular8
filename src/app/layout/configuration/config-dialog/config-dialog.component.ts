import {Component, OnInit, Inject} from '@angular/core';
import {SysConfig} from '../../../entities/sys-config';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-config-dialog',
    templateUrl: './config-dialog.component.html',
    styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent<T> implements OnInit {
    config: SysConfig;

    constructor(public dialogRef: MatDialogRef<ConfigDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify) {
        this.config = data.config;
    }

    ngOnInit() {
    }

    save(form: NgForm) {
        this.stewardService.put('ufs-common-modules/api/v1/system-config', this.config).subscribe(response => {
            if (response.code == 200) {
                form.resetForm();
                this.dialogRef.close();
                this.notify.showSuccess(response.message);
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
            } else {
                this.notify.showWarning(response.message);
            }
        });
    }

}
