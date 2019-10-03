import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { routerTransition } from '../../../../../router.animations';
import { PartsRequisition } from '../../../../../entities/partsrequisition';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OnboardingserviceService } from '../../../onboarding/onboardingservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { order } from '../../../onboarding/Entities/orders-model';
@Component({
  selector: 'app-editpartrequisition',
  templateUrl: './editpartrequisition.component.html',
  styleUrls: ['./editpartrequisition.component.scss'],
  animations: [routerTransition()]
})
export class EditpartrequisitionComponent implements OnInit  {
  customers = new PartsRequisition();
  upload: FormGroup;
  parts = [];
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
    this.customers = new PartsRequisition();
  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let inst = this;
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
      File: ['', Validators.required],
      dateRequested: ['',[Validators.required] ],

    });
  }

  // Method for selecting a different file
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.upload.get('File').setValue(file);
    }
  }
  // Upload the file to the API
  FileUpload() {
    this.submitted = true;
    // Instantiate a FormData to store form fields and encode the file
    const body = new FormData();
    // Add file content to prepare the request
    body.append('File', this.upload.get('File').value);
     // Launch post request
    //(body);
    this.onboardingservices.sendd('atlas/requestParts/Bulkrequest', body)
      .subscribe(
        // Admire results
        (data) => { }
      );
    this.router.navigate(['/trcm-lab-automation/parts/partsrequstion']);
  }
  // method to fetch customers for updating
  fetchCustomers(id: number) {
    // tslint:disable-next-line:prefer-const
    let params: Map<any, string> = new Map();
    // tslint:disable-next-line:prefer-const
    let inst = this;
    // fetch customers make list
    this.onboardingservices.get('atlas/requestParts/' + id, params).subscribe((response) => {
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
      this.onboardingservices.put('atlas/requestParts', this.customers)
      .subscribe((response) => {
        //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
          inst.notify.showSuccess(response.message);
          // form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/parts/partsrequstion']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        //(error);
      });
    } else {
      this.onboardingservices.post('atlas/requestParts/Bulkrequest', this.customers).subscribe((response) => {
        // //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 201) {
          inst.notify.showSuccess(response.message);
          form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/parts/partsrequstion']);
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