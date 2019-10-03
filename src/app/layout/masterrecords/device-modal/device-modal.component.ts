import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../router.animations';
import {DeviceModel} from '../../../entities/device-model';
import {DeviceMake} from '../../../entities/device-make';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {DeviceType} from '../../../entities/device-type';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-device-modal',
    templateUrl: './device-modal.component.html',
    styleUrls: ['./device-modal.component.scss'],
    animations: [routerTransition()]
})
export class DeviceModalComponent implements OnInit {

    model: DeviceModel;
    makes: Array<DeviceMake>;
    types: Array<DeviceType>;
    protected isUpdate: boolean = false;

    constructor(private stewardService: HttpStewardService<any, any>, private route: ActivatedRoute, private notify: Notify, protected router: Router) {
        this.model = new DeviceModel();
        this.makes = new Array();
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
        // fetch device type list
        params.set('sort', 'deviceTypeId,desc');
        this.stewardService.get('device/type', params).subscribe((response) => {
            if (response.code == 200) {
                inst.types = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchModel(params['id']);
            }
        });
    }

    /**
     * Save device model to the api
     */
    save(form: NgForm) {
        const inst = this;
        if (this.isUpdate) {
            this.stewardService.put('device/model', this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess('Updated ' + inst.model.model) + ' successfully';
                    form.resetForm();
                } else {
                    inst.notify.showWarning(response.message);
                }
            });
        } else {
            this.stewardService.post('device/model/create', this.model).subscribe((response) => {
                if (response.code == 200) {
                    inst.notify.showSuccess('Created ' + inst.model.model) + ' successfully';
                    form.resetForm();
                } else {
                    inst.notify.showWarning(response.message);
                }
            });
        }
    }

    private fetchModel(id: number) {
        const inst = this;
        // fetch device make list
        this.stewardService.get('device/model/' + id).subscribe((response) => {
            if (response.code == 200) {
                inst.model = response.data;
            } else {
                inst.notify.showWarning(response.message);
            }
        });
    }
}
