import {Component, OnInit, Inject, Renderer} from '@angular/core';
import {Devices} from '../../../../entities/devices-list-model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpStewardService} from '../../../../shared/services/http-steward.service';
import {Notify} from '../../../../shared/classes/notify';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Currency} from '../../../../entities/currency-model';
import {Telco} from '../../../../entities/telcos-model';
import {OnboardingtWrapper} from '../../../../entities/wrappers/onboarding-wrapper';
import {DeviceMake} from '../../../../entities/device-make';

@Component({
    selector: 'app-edit-device-dialog',
    templateUrl: './edit-device-dialog.component.html',
    styleUrls: ['./edit-device-dialog.component.scss']
})
export class EditDeviceDialogComponent<T> implements OnInit {

    device: Devices;
    model: OnboardingtWrapper;
    currencies: Array<Currency>;
    simcard: Array<Telco>;
    simpleSelected: any = {};
    public items;
    productId: number;
    devicemodels: any[];
    makes: Array<DeviceMake>;

    constructor(public dialogRef: MatDialogRef<EditDeviceDialogComponent<T>>, @Inject(MAT_DIALOG_DATA) public data: any, protected stewardService: HttpStewardService<any, any>, protected notify: Notify, protected renderer: Renderer, private router: Router) {
        this.device = data.data;
        this.productId = data.productId;
        this.model = new OnboardingtWrapper();
        this.makes = new Array();
        this.model.makeId = this.device.modelId.makeId;
        this.model.modelId = this.device.modelId.modelId;
    }

    ngOnInit() {
        this.stewardService.get('business-units/unititems/product/' + this.productId).subscribe(response => {
            //(response);
            if (response.code == 200) {
                this.setBusinessUnit(response.data);
            } else {
                //(response);
            }
        }, error => {
            //(error);
        });

        const params: Map<any, string> = new Map();
        params.set('size', '1000');
        params.set('sort', 'makeId,desc');

        this.stewardService.get('device/make', params).subscribe((response) => {
            if (response.code == 200) {
                this.makes = response.data.content;
            } else {
                this.notify.showWarning(response.message);
            }
        });

        this.loadModels();
    }
    setBusinessUnit(items: any): void {
        this.items = items;

        this.simpleSelected = {
        };
    }
    loadModels() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('size', '1000');
        params.set('sort', 'modelId,desc');
        params.set('makeId', inst.model.makeId + '');
        // fetch device make list
        this.stewardService.get('device/model', params).subscribe((response) => {
            if (response.code == 200) {
                inst.devicemodels = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }
    updateDevice(form: NgForm) {
        const inst = this;
        //(this.model);
        this.model.deviceId = this.device.deviceId;
        this.model.unitItemId = this.simpleSelected.unitItemId;
        this.model.serialNo = this.device.serialNo;


        this.stewardService.postFormDataMultipart('onboarding/update-device', this.model).subscribe((response) => {
            if (response.code == 200) {
                inst.notify.showWarning(response.message);
                inst.dialogRef.close();
            } else {
                inst.notify.showWarning(response.message);
            }
            inst.dialogRef.close();
            form.resetForm();
        }, error => {
            //(error);
        });
    }

}
