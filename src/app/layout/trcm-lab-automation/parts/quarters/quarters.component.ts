import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { customer } from '../../onboarding/Entities/customer-model';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';
import { Notify } from '../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quarters',
  templateUrl: './quarters.component.html',
  styleUrls: ['./quarters.component.scss'],
  animations: [routerTransition()]
})
export class QuartersComponent implements OnInit {
  customers = new customer();
  countries = [];
  // tslint:disable-next-line:no-inferrable-types
  public isUpdate: boolean = false;
  id: Number;
  submitted = false;
  upload: FormGroup;

  constructor(
    // private stewardServices: HttpStewardService<any, any>,
    private onboardingservices: OnboardingserviceService<any, any>,
    private notify: Notify,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder) {
    this.customers = new customer();
  }

  ngOnInit() {
this.createForm();
  }
  createForm() {
    this.upload = this.fb.group({
      Year: ['']
    });
  }
  Onsubmit() {
    const inst = this;
    this.submitted = true;
    // Instantiate a FormData to store form fields and encode the file
    const body = new FormData();
    // Add file content to prepare the request

    body.append('Year', this.upload.get('Year').value);
    // Launch update request
    //(body);
    this.onboardingservices.gett('atlas/orders/firstQuater', body)
    .subscribe((data) => {
      //(' Testing year', data);
         if (data.code === 200) {
        inst.notify.showSuccess(data.message);

  inst.router.navigate(['/trcm-lab-automation/parts/firstquarter']);
      } else {
        inst.notify.showWarning(data.message);
      }
     }
    );
  this.router.navigate(['/trcm-lab-automation/parts/firstquarter']);
}
  get f() { return this.upload.controls; }

  goBack() {
    // window.history.back();
    this.location.back();

    //( 'goBack()...' );
  }

}

