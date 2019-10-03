import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { routerTransition } from '../../../../../router.animations';
import { OnboardingserviceService } from '../../onboardingservice.service';
import {Location} from '@angular/common';
import { Warranty } from '../../Entities/warrantyWrapper';


@Component({
  selector: 'app-setwarranty',
  templateUrl: './setwarranty.component.html',
  styleUrls: ['./setwarranty.component.scss'],
  animations: [routerTransition()]
})
export class SetwarrantyComponent implements OnInit {
  
customers = new Warranty();
names = [];
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
    this.customers = new Warranty();
  }

  ngOnInit() {
    // fetch customers from database
    // tslint:disable-next-line:prefer-const
    let inst = this;
    this.onboardingservices.get('atlas/customers').subscribe((response) => {
      if (response.code === 200) {
        inst.names = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });

    // fetch customers for updating
    this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.isUpdate = true;
       
      }

    });
  }
 
  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let inst = this;
  
      //(this.customers);
      this.onboardingservices.put('atlas/devices/setWarranty', this.customers)
      .subscribe((response) => {
        //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
          inst.notify.showSuccess(response.message);
          // form.resetForm();
          this.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding']);
        } else {
          inst.notify.showWarning("Unsuccesful, Please check and Try again");
        }
      }, error => {
        //(error);
      });
    
    
  }
  goBack() {
    // window.history.back();
    this.location.back();

    //( 'goBack()...' );
  }

}

