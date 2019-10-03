import { Component, OnInit, Renderer } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { customer } from '../../Entities/customer-model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { NgForm } from '@angular/forms';
import { Notify } from '../../../../../shared/classes/notify';
import { OnboardingserviceService } from '../../onboardingservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.scss'],
  animations: [routerTransition()]
})
export class CreateCustomersComponent implements OnInit {
  customers = new customer();
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
    this.customers = new customer();
  }

  ngOnInit() {
    // fetch customers from database
    // tslint:disable-next-line:prefer-const
    let inst = this;
    this.onboardingservices.get('atlas/regions').subscribe((response) => {
      if (response.code === 200) {
        inst.countries = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });

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
    params.set('actionStatus', 'Approved');
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
      this.onboardingservices.put('atlas/customers', this.customers)
      .subscribe((response) => {
        //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
          inst.notify.showSuccess(response.message);
          // form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/onboarding/customer-onboarding']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        //(error);
      });
    } else {
      this.onboardingservices.post('atlas/customers', this.customers).subscribe((response) => {
        // //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 201) {
          inst.notify.showSuccess(response.message);
          form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/onboarding/customer-onboarding']);
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

