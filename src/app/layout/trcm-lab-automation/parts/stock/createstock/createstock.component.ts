import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { customer } from '../../../onboarding/Entities/customer-model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OnboardingserviceService } from '../../../onboarding/onboardingservice.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { partsmaster } from '../../../onboarding/Entities/partsmaster';

@Component({
  selector: 'app-createstock',
  templateUrl: './createstock.component.html',
  styleUrls: ['./createstock.component.scss'],
  animations: [routerTransition()]
})
export class CreatestockComponent implements OnInit {
  customers = new partsmaster();
  upload: FormGroup;
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
    private fb: FormBuilder,
    private location: Location) {
    this.customers = new partsmaster();
  }

  ngOnInit() {
    // fetch customers for updating
    const inst = this;
    this.onboardingservices.get('atlas/partsMaxMinConfigs').subscribe((response) => {
      if (response.code === 200) {
        inst.names = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });
    this.route.params.subscribe(params => {

      if (params['id'] != null) {
        this.isUpdate = true;
        this.fetchCustomers(params['id']);
      }

    });
    this.createForm();

  }
  createForm() {
        this.upload = this.fb.group({
          partnumber: [''],
          openingstock: ['']
        });
      }

  // method to fetch customers for updating
  fetchCustomers(id: number) {
    // tslint:disable-next-line:prefer-const
    let params: Map<any, string> = new Map();
    // tslint:disable-next-line:prefer-const
    let inst = this;
    // fetch customers make list
    this.onboardingservices.get('atlas/stocks/' + id, params).subscribe((response) => {
      //(response);
      if (response.code = 200) {
        inst.customers = response.data;

      } else {
        this.isUpdate = false;
        inst.notify.showWarning(response.message);
      }
    });
  }
  Onsubmit() {
        this.submitted = true;
        // Instantiate a FormData to store form fields and encode the file
        const body = new FormData();
        body.append('partnumber', this.upload.get('partnumber').value);
        body.append('openingstock', this.upload.get('openingstock').value);
        // Launch post request
        //(body);
        this.onboardingservices.sendd('atlas/stocks/stocks', body)
          .subscribe(
            // Admire results
            (data) => { }
          );
        this.router.navigate(['/trcm-lab-automation/parts/stock']);
      }
      get f() { return this.upload.controls; }
      goBack() {
        // window.history.back();
        this.location.back();
        //( 'goBack()...' );
      }
    }


