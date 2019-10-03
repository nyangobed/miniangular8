import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { device } from '../../Entities/device-model';
import { routerTransition } from '../../../../../router.animations';
import { Notify } from '../../../../../shared/classes/notify';
import { OnboardingserviceService } from '../../onboardingservice.service';

@Component({
  selector: 'app-update-contractperiod',
  templateUrl: './update-contractperiod.component.html',
  styleUrls: ['./update-contractperiod.component.scss'],
  animations: [routerTransition()]
})
export class UpdateContractperiodComponent implements OnInit {
  devices = new device();
  // tslint:disable-next-line:no-inferrable-types
  public isUpdate: boolean = false;
  id: Number;
  submitted = false;

  constructor(
    // private stewardServices: HttpStewardService<any, any>,
    private onboardingservices: OnboardingserviceService<any, any>,
    private notify: Notify,
    private route: ActivatedRoute,
    private router: Router) {
    this.devices = new device();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.isUpdate = true;
        this.fetchDevices(params['id']);
      }

    });


  }
  fetchDevices(id: number) {
    // tslint:disable-next-line:prefer-const
    let params: Map<any, string> = new Map();
    // tslint:disable-next-line:prefer-const
    let inst = this;
    // fetch customers make list
    this.onboardingservices.get('atlas/devices/' + id, params).subscribe((response) => {
      //(response);
      if (response.code = 200) {
        inst.devices = response.data;

      } else {
        this.isUpdate = false;
        inst.notify.showWarning(response.message);
      }
    });
  }
  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    this.submitted = true;
    let inst = this;
    if (this.isUpdate) {
      //(this.devices);
      this.onboardingservices.put('atlas/devices', this.devices).subscribe((response) => {
        //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
          inst.notify.showSuccess(response.message);
          // form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/onboarding/devices-onboarding']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        //(error);
      });
    } else {
      this.onboardingservices.post('atlas/devices', this.devices).subscribe((response) => {
        // //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 201) {
          inst.notify.showSuccess(response.message);
          //  form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/onboarding/devices-onboarding']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        //(error);
      });
    }
  }

}
