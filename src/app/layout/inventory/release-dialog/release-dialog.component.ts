import {Component, OnInit, Renderer, Inject} from '@angular/core';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {NgForm} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-release-dialog',
    templateUrl: './release-dialog.component.html',
    styleUrls: ['./release-dialog.component.scss']
})
export class ReleaseDialogComponent<T> implements OnInit {
    public model: ReleaseEntity = new ReleaseEntity([], "", "Repair");;
    releaseContent: any;
    public releaseId: number;
    constructor(public dialogRef: MatDialogRef<ReleaseDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected renderer: Renderer, protected notify: Notify) {
        this.model = data.model;
        this.releaseContent = data.releaseContent;
        this.releaseId = data.releaseId;
    }

    ngOnInit() {
    }

    processRelease(form: NgForm) {
        this.stewardService.put("devices/release", this.model).subscribe(response => {
            if (response.code == 200) {
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                form.resetForm();
                this.dialogRef.close();
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
class ReleaseEntity {
    ids: Array<number>;
    notes: string;
    status: string

    constructor(ids: Array<number>, notes: string, status: string) {
        this.ids = ids;
        this.notes = notes;
        this.status = status;

    }
}
