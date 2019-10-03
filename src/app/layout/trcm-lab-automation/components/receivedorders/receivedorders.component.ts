import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../shared/classes/notify';
import { OnboardingserviceService } from '../../onboarding/onboardingservice.service';
import {Location} from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { HttpStewardService } from '../../../../shared/services/http-steward.service';
@Component({
  selector: 'app-receivedorders',
  templateUrl: './receivedorders.component.html',
  styleUrls: ['./receivedorders.component.scss'],
  animations: [routerTransition()]
})
export class ReceivedordersComponent implements OnInit {
  
  countries = [];
  
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
      private stewardService:HttpStewardService<any, any>) { }
  
  
    ngOnInit() {
      const inst = this;
      
      this.createForm();
    }
  
    // Instantiate an AbstractControl from a user specified configuration
    createForm() {
      this.upload = this.fb.group({
        
        receiveddate: ['',[Validators.required] ],
        pordernumberr: ['',[Validators.required] ],
        
        File: ['', Validators.required]
        
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
      body.append('receiveddate', this.upload.get('receiveddate').value);
      body.append('pordernumberr', this.upload.get('pordernumberr').value);
      
      // Launch post request
      console.log(body);
      this.stewardService.postFile('atlas/ordersReceivedd/receivedOrders', body)
        .subscribe(
          // Admire results
          (data) => { console.log(data); },
          // Or errors :-(
          error => console.log(error),
          // tell us if it's finished
          () => { console.log('completed'); }
        );
      this.router.navigate(['/trcm-lab-automation/components/pendingorders']);
    }
    get f() { return this.upload.controls; }
    goBack() {
      // window.history.back();
      this.location.back();
      console.log( 'goBack()...' );
    }
  }
  
