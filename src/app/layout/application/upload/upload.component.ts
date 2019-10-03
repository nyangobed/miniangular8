import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {Application} from '../../../entities/application';
import {DeviceMake} from '../../../entities/device-make';
import {DeviceModel} from '../../../entities/device-model';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    animations: [routerTransition()]
})
export class UploadComponent implements OnInit {

    model: Application;
    makes: Array<DeviceMake>;
    models: Array<DeviceModel>;
    products: Array<any>;
    makeId: string;
    _application: any;
    protected isUpdate: boolean = false;

    constructor(private stewardService: HttpStewardService<any, any>, private route: ActivatedRoute, private notify: Notify, protected router: Router) {
        this.model = new Application();
        this.makes = [];
        this.models = [];
        this.makeId = '';
        this.products = [];
    }

    ngOnInit() {
        const params: Map<any, string> = new Map();
        const inst = this;
        params.set('actionStatus', 'Approved');
        params.set('size', '1000');
        params.set('sort', 'makeId,desc');
        // fetch device make list
        this.stewardService.get('device/make', params).subscribe((response) => {
            if (response.code == 200) {
                inst.makes = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
        params.set('sort', 'productId,desc');
        // fetch device make list
        this.stewardService.get('products', params).subscribe((response) => {
            if (response.code == 200) {
                inst.products = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchApplication(params['id']);
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
        // fetch device make list
        this.stewardService.get('device/model', params).subscribe((response) => {
            if (response.code == 200) {
                inst.models = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }

    fileSelected(files: Array<File>) {
        this.model.application = files[0];
    }

    save(form: NgForm) {
        const inst = this;

        if (!this.isUpdate) {
            this.stewardService.postFormData('app-management', this.model).subscribe((response) => {
                if (response.code == 201) {
                    form.resetForm();
                    inst.notify.showWarning(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            });
        } else {
            // //(this.model);
            this.stewardService.postFormData('app-management/update', this.model).subscribe((response) => {
                if (response.code == 201) {
                    form.resetForm();
                    inst.notify.showWarning(response.message);
                } else {
                    inst.notify.showWarning(response.message);
                }
            });
        }
    }

    private fetchApplication(id: number) {
        const inst = this;
        this.stewardService.get('app-management/' + id).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }
}
