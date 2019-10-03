import {Component, Inject, OnInit, Renderer} from '@angular/core';
import {Notify} from '../../../shared/classes/notify';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {AddTaskWrapper} from '../../../entities/wrappers/AddTaskWrapper';
import {Devices} from '../../../entities/devices-list-model';
import {Apps} from '../../../entities/apps-model';
import {NgForm} from '@angular/forms';
import {UploadEvent, UploadFile} from 'ngx-file-drop';
import {Product} from '../../../entities/product-model';

@Component({
    selector: 'app-task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent<T> implements OnInit {
    showDropandDrag = false;
    downloadType: string;
    showAppSelect = false;
    task: AddTaskWrapper;
    apps: Array<Apps>;
    device: Devices;
    product: Product;

    filed: File[] = [];

    // for file uploads
    public files: UploadFile[] = [];

    constructor(public dialogRef: MatDialogRef<TaskDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, protected modalService: NgbModal, protected renderer: Renderer, private router: Router) {
        this.task = new AddTaskWrapper();
        this.device = data.data;
        this.product = data.product;
        this.apps = [];
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('modelId', this.device.modelId.modelId.toString());

        this.stewardService.get('app-management', params).subscribe((response) => {
            if (response.code == 200) {
                if (response.data != null) {
                    inst.apps = response.data.content;
                } else {
                    inst.notify.showWarning('No Applicationns Found');
                }
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    alterDownloadType() {
        if (this.task.downloadType == 'App and Files' || this.task.downloadType == 'Files Only') {
            this.showDropandDrag = true;
        } else {
            this.showDropandDrag = false;
        }

        if (this.task.downloadType == 'Files Only') {
            this.showAppSelect = false;
        } else {
            this.showAppSelect = true;
        }
    }

    saveTasks(form: NgForm) {
        this.task.file = this.filed;
        this.task.deviceId = this.device.deviceId;
        this.task.modelId = this.device.modelId.makeId;
        this.task.productId = this.product.productId;
        const inst = this;
        this.stewardService.postFormDataMultipart('onboarding/add-task', this.task).subscribe((response) => {
            if (response.code === 200) {
                inst.notify.showWarning(response.message);

            } else {
                inst.notify.showWarning(response.message);
            }
            this.dialogRef.close();
            form.resetForm();
        }, error => {
            //(error);
        });
    }

    public dropped(event: UploadEvent) {
        this.files = event.files;
        for (const file of event.files) {
            file.fileEntry.file(info => {
                this.filed.push(info);
            });
        }
    }

    public fileOver(event) {
        //(event);
    }

    public fileLeave(event) {
        //(event);
    }
}
