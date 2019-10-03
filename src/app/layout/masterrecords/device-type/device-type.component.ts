import {Component, OnInit} from '@angular/core';
import {DeviceType} from '../../../entities/device-type';
import {routerTransition} from '../../../router.animations';
import {NgForm} from '@angular/forms';
import {HttpStewardService} from '../../../shared/services/http-steward.service';
import {Notify} from '../../../shared/classes/notify';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-device-type',
    templateUrl: './device-type.component.html',
    styleUrls: ['./device-type.component.scss'],
    animations: [routerTransition()]
})
export class DeviceTypeComponent implements OnInit {

    model: DeviceType = new DeviceType();
    protected isUpdate: boolean = false;

    constructor(private stewardService: HttpStewardService<DeviceType, any>, protected notify: Notify,
        protected router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchEntity(params['id']);
            }
        });
    }

    fetchEntity(id: number) {
        this.stewardService.get("device/type/" + id).subscribe(response => {
            if (response.code == 200) {
                this.model = response.data;
            } else {
                this.notify.showWarning("Sorry record not found");
                this.isUpdate = false;
            }
        });
    }

    /**
     * Used to submit device type form
     */
    save(form: NgForm) {
        if (this.isUpdate) {
            this.stewardService.put('device/type', this.model).subscribe((response) => {
                if (response.code == 200) {
                    this.notify.showSuccess('Updated ' + this.model.type + ' successfully');
                    this.router.navigate(["/masterrecords/device-type/list"]);
                } else {
                    this.notify.showWarning(response.message);
                }
            });
        } else {
            this.stewardService.post('device/type', this.model).subscribe((response) => {
                if (response.code == 201) {
                    this.notify.showSuccess('Created ' + this.model.type + ' successfully');
                    form.resetForm();
                } else {
                    this.notify.showWarning(response.message);
                }
            });
        }
    }

}
