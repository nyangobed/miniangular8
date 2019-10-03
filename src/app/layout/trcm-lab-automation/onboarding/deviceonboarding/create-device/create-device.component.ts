import { Component, OnInit, ɵConsole, ElementRef, ViewChild } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { device } from '../../Entities/device-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OnboardingserviceService } from '../../onboardingservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss'],
  animations: [routerTransition()]
})
export class CreateDeviceComponent implements OnInit {
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
    this.onboardingservices.get('atlas/manufacturers').subscribe((response) => {
      if (response.code === 200) {
        inst.nams = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });
    this.onboardingservices.get('atlas/deviceModel').subscribe((response) => {
      if (response.code === 200) {
        inst.nas = response.data.content;

      } else {
        inst.notify.showWarning(response.message);
      }
    });
    this.createForm();
  }

  // Instantiate an AbstractControl from a user specified configuration
  createForm() {
    this.upload = this.fb.group({
      deviceowner: ['', [Validators.required, Validators.minLength(5)]],
      warrantyperiod: ['', [Validators.minLength(2)]],
      contractperiod: ['', [Validators.minLength(2)]],
      File: ['', Validators.required],
      devicemodel: [''],
      manufacturer: ['']
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
    body.append('deviceowner', this.upload.get('deviceowner').value);
    body.append('manufacturer', this.upload.get('manufacturer').value);
    body.append('devicemodel', this.upload.get('devicemodel').value);

    this.onboardingservices.sendd('atlas/devices/uploaddevices', body)
      .subscribe(
       // Admire results
       (data) => { console.log(data); },
       // Or errors :-(
       error => console.log(error),
       // tell us if it's finished
       () => { console.log('completed'); }
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
