import { Component, OnInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { customer } from '../../Entities/customer-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { NgForm } from '@angular/forms';
import { Notify } from '../../../../../shared/classes/notify';
import { OnboardingserviceService } from '../../onboardingservice.service';
import {Location} from '@angular/common';
import { device } from '../../Entities/devices';

@Component({
  selector: 'app-single-devices',
  templateUrl: './single-devices.component.html',
  styleUrls: ['./single-devices.component.scss'],
  animations: [routerTransition()]
})
export class SingleDevicesComponent implements OnInit {
  customers = new device();
  countries = [];
  // tslint:disable-next-line:no-inferrable-types
  public isUpdate: boolean = false;
  id: Number;
  submitted = false;

  constructor(
    // private stewardServices: HttpStewardService<any, any>,
    private onboardingservices: OnboardingserviceService<any, any>,
    private notify: Notify,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {
    this.customers = new device();
  }

  ngOnInit() {

    // fetch customers for updating
    this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.isUpdate = true;
        this.fetchCustomers(params['id']);
      }

    });
  }
  // method to fetch customers for updating
  fetchCustomers(id: number) {
    // tslint:disable-next-line:prefer-const
    let params: Map<any, string> = new Map();
    // tslint:disable-next-line:prefer-const
    let inst = this;
    // fetch customers make list
    this.onboardingservices.get('atlas/customers/' + id, params).subscribe((response) => {
      //(response);
      if (response.code = 200) {
        inst.customers = response.data;

      } else {
        this.isUpdate = false;
        inst.notify.showWarning(response.message);
      }
    });
  }
  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let inst = this;
    if (this.isUpdate) {
      //(this.customers);
      this.onboardingservices.put('atlas/devices', this.customers)
      .subscribe((response) => {
        //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
          inst.notify.showSuccess(response.message);
          // form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        //(error);
      });
    } else {
      this.onboardingservices.post('atlas/devices', this.customers).subscribe((response) => {
        // //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 201) {
          inst.notify.showSuccess(response.message);
          form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding']);
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

