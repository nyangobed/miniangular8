import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { Location } from '@angular/common';
import { PendingOrders } from '../../../../../entities/pending-orders';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { OnboardingserviceService } from '../../../onboarding/onboardingservice.service';
import { Notify } from '../../../../../shared/classes/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuedParts } from '../../../../../entities/issuedparts';

@Component({
  selector: 'app-edit-parts-issued',
  templateUrl: './edit-parts-issued.component.html',
  styleUrls: ['./edit-parts-issued.component.scss'],
  animations: [routerTransition()]
})
export class EditPartsIssuedComponent implements OnInit {
  customers = new IssuedParts();
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
    this.customers = new IssuedParts();
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
      dateIssued: ['',[Validators.required] ],

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
    this.onboardingservices.sendd('atlas/issueParts/partsIssued', body)
      .subscribe(
        // Admire results
        (data) => { }
      );
    this.router.navigate(['/trcm-lab-automation/parts/partsIssued']);
  }
  // method to fetch customers for updating
  fetchCustomers(id: number) {
    // tslint:disable-next-line:prefer-const
    let params: Map<any, string> = new Map();
    // tslint:disable-next-line:prefer-const
    let inst = this;
    // fetch customers make list
    this.onboardingservices.get('atlas/issueParts/' + id, params).subscribe((response) => {
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
      this.onboardingservices.put('atlas/issueParts', this.customers)
      .subscribe((response) => {
        //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
          inst.notify.showSuccess(response.message);
          // form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/parts/partsIssued']);
        } else {
          inst.notify.showWarning(response.message);
        }
      }, error => {
        //(error);
      });
    } else {
      this.onboardingservices.post('atlas/ordersReceivedd/receivedOrders', this.customers).subscribe((response) => {
        // //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 201) {
          inst.notify.showSuccess(response.message);
          form.resetForm();
          inst.router.navigate(['/trcm-lab-automation/parts/partsIssued']);
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