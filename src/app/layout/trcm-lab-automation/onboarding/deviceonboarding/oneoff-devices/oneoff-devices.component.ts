import { Component, OnInit, ɵConsole, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { device } from '../../Entities/device-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OnboardingserviceService } from '../../onboardingservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-oneoff-devices',
  templateUrl: './oneoff-devices.component.html',
  styleUrls: ['./oneoff-devices.component.scss'],
  animations: [routerTransition()]
})
export class OneoffDevicesComponent implements OnInit {
  upload: FormGroup;
  names = [];
  nams = [];
  nas = [];
  File: File;
  isUpdate = false;
  submitted = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notify: Notify,
    private location: Location,
    //  private stewardService: HttpStewardService<any, any>)
    private onboardingservices: OnboardingserviceService<any, any>) { }


  ngOnInit() {
    const inst = this;
    this.onboardingservices.get('atlas/customers').subscribe((response) => {
      if (response.code === 200) {
        inst.names = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });
    this.createForm();
  }

  // Instantiate an AbstractControl from a user specified configuration
  createForm() {
    this.upload = this.fb.group({
      deviceownerr: ['', [Validators.required, Validators.minLength(5)]],
      File: ['', Validators.required],
      status: ['', Validators.required]
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
  Onsubmit() {
    this.submitted = true;
    // Instantiate a FormData to store form fields and encode the file
    const body = new FormData();
    // Add file content to prepare the request
    body.append('File', this.upload.get('File').value);
    body.append('deviceownerr', this.upload.get('deviceownerr').value);
    body.append('status', this.upload.get('status').value);
    // Launch post request
    //(body);
    this.onboardingservices.sendd('atlas/devices/oneOffRepair', body)
      .subscribe(
        // Admire results
        (data) => { },
 
        
        () => { }
      );
    this.router.navigate(['/trcm-lab-automation/onboarding/device-onboarding']);
  }
  get f() { return this.upload.controls; }
  goBack() {
    // window.history.back();
    this.location.back();
    //( 'goBack()...' );
  }
}
