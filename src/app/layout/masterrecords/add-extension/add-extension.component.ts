import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceFileExtension} from '../../../entities/device-file-extension';
import {DeviceMake} from '../../../entities/device-make';
import {DeviceModel} from '../../../entities/device-model';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-add-extension',
    templateUrl: './add-extension.component.html',
    styleUrls: ['./add-extension.component.scss'],
    animations: [routerTransition()]
})
export class AddExtensionComponent implements OnInit {

    model: DeviceFileExtension;
    makes: Array<DeviceMake>;
    models: Array<DeviceModel>;
    products: Array<any>;
    makeId: string;
    _application: any;

    constructor(private stewardService: HttpStewardService<any, any>, private notify: Notify) {
        this.model = new DeviceFileExtension();
        this.makes = new Array();
        this.models = new Array();
        this.makeId = '';
        this.products = new Array();
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('size', '1000');
        params.set('sort', 'makeId,desc');
        //fetch device make list
        this.stewardService.get('device/make', params).subscribe((response) => {
            if (response.code == 200) {
                inst.makes = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
        params.set('sort', 'productId,desc');
        //fetch device make list
        this.stewardService.get('products', params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    loadModels() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('size', '1000');
        params.set('sort', 'modelId,desc');
        params.set('makeId', this.makeId);
        //fetch device make list
        this.stewardService.get('device/model', params).subscribe((response) => {
            if (response.code == 200) {
                inst.models = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }
    save(form: NgForm) {
        const inst = this;
        this.stewardService.post('device/file-extension', this.model).subscribe((response) => {
            if (response.code == 201) {
                form.resetForm();
                inst.notify.showWarning(response.message);
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

}
