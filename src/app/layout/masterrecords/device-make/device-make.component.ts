import {Component, OnInit} from '@angular/core';

import {DeviceMake} from './../../../entities/device-make';
import {routerTransition} from './../../../router.animations';
import {HttpStewardService} from './../../../shared/services/http-steward.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Routes, Router} from '@angular/router';
import {Notify} from '../../../shared/classes/notify';

@Component({
    selector: 'app-device-make',
    templateUrl: './device-make.component.html',
    styleUrls: ['./device-make.component.scss'],
    animations: [routerTransition()]
})
export class DeviceMakeComponent implements OnInit {

    model: DeviceMake;
    protected isUpdate: boolean = false;

    constructor(private stewardService: HttpStewardService<DeviceMake, any>,
        private route: ActivatedRoute, private notify: Notify, protected router: Router) {
        this.model = new DeviceMake();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchModel(params['id']);
            }
        });
    }

    fetchModel(id: number) {
        this.stewardService.get("device/make/" + id).subscribe(response => {
            if (response.code == 200) {
                this.model = response.data;
            } else {
                this.notify.showWarning("Sorry record not found");
                this.isUpdate = false;
            }
        });
    }
    /**
     * Used to persist make entity in the backend service
     */
    save(form: NgForm) {
        if (this.isUpdate) {
            this.stewardService.put("device/make", this.model).subscribe((response) => {
                if (response.code == 200) {
                    this.notify.showSuccess("Updated " + this.model.make + " successfully");
                    this.router.navigate(["/masterrecords/device-make/list"]);
                } else {
                    this.notify.showWarning(response.message);
                }
            });
        } else {
            this.stewardService.post("device/make", this.model).subscribe((response) => {
                if (response.code == 201) {
                    this.notify.showSuccess("Created " + this.model.make + " successfully");
                    form.resetForm();
                } else {
                    this.notify.showWarning(response.message);
                }
            });
        }
    }

}
