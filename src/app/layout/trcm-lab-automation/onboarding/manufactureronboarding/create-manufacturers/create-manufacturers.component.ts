import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { OnboardingserviceService } from '../../onboardingservice.service';
import { manufacturer } from '../../Entities/manufacturer-model';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { NgForm } from '@angular/forms';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
    selector: 'app-create-manufacturers',
    templateUrl: './create-manufacturers.component.html',
    styleUrls: ['./create-manufacturers.component.scss'],
    animations: [routerTransition()]
})
export class CreateManufacturersComponent implements OnInit {
    // tslint:disable-next-line:no-inferrable-types
    public isUpdate: boolean = false;
    manufacturers = new manufacturer();
    // submitted = false;
    id: any;

    constructor(
        //   private stewardServices: HttpStewardService<any, any>,
        private onboardingservices: OnboardingserviceService<any, any>,
        private notify: Notify,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) {
        this.manufacturers = new manufacturer();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.fetchManufacturers(params['id']);

            }
        });

    }
    fetchManufacturers(id: number) {
        // tslint:disable-next-line:prefer-const
        let params: Map<any, string> = new Map();
        // tslint:disable-next-line:prefer-const
        let inst = this;
        // fetch customers make list
        this.onboardingservices.get('atlas/manufacturers/' + id, params).subscribe((response) => {
            //(response);
            if (response.code = 200) {
                inst.manufacturers = response.data;
            } else {
                this.isUpdate = false;
                inst.notify.showWarning(response.message);
            }
        });
    }
    onSubmit(form: NgForm) {
        // this.submitted = true;
        // tslint:disable-next-line:prefer-const
        let inst = this;
        if (this.isUpdate) {
            this.onboardingservices.put('atlas/manufacturers', this.manufacturers).subscribe((response) => {
                //(response);
                if (response.code === 200) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/trcm-lab-automation/onboarding/manufacturer-onboarding']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        } else {
            this.onboardingservices.post('atlas/manufacturers', this.manufacturers).subscribe((response) => {
                // //(response);
                if (response.code === 201) {
                    inst.notify.showSuccess(response.message);
                    form.resetForm();
                    inst.router.navigate(['/trcm-lab-automation/onboarding/manufacturer-onboarding']);
                } else {
                    inst.notify.showWarning(response.message);
                }
            }, error => {
                //(error);
            });
        }
    }
    goBack() {
        // window.history.back();
        this.location.back();

        //( 'goBack()...' );
      }
}
