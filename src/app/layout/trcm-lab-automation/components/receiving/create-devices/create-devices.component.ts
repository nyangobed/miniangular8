import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routerTransition } from '../../../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { Repair } from '../../../models/repair/repair';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
    selector: 'app-create-devices',
    templateUrl: './create-devices.component.html',
    styleUrls: ['./create-devices.component.scss'],
    animations: [routerTransition()]
})
export class CreateDevicesComponent implements OnInit {
    isUpdate = false;
    upload: FormGroup;
    File: File;
    submitted = false;
    errorMsg = '';
    client = [];
    Repair: Repair;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private notify: Notify,
        private activatedRoute: ActivatedRoute,
        private httpStewardService: HttpStewardService<any, any>
    ) {}

    ngOnInit() {
        const inst = this;
        this.httpStewardService.get('atlas/customers').subscribe(response => {
            if (response.code === 200) {
                inst.client = response.data.content;
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        // call the function to initialize the form on page load
        this.createForm();
    }

    // Instantiate an AbstractControl from a user specified configuration
    createForm() {
        this.upload = this.fb.group({
            clientName: ['', [Validators.required]],
            comments: ['', [Validators.required]],
            File: ['', Validators.required],
            from: ['', Validators.required]
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.upload.get('File').setValue(file);
        }
    }

    // Upload the file to the API
    uploadDoc() {
        // Instantiate a FormData to store form fields and encode the file
        const body = new FormData();

        // Add the comments section.
        body.append('clientName', this.upload.get('clientName').value);
        // Add the comments section.
        body.append('comments', this.upload.get('comments').value);
        // Add file content to prepare the request
        body.append('File', this.upload.get('File').value);
        // Add the person who handed over the devices
        body.append('from', this.upload.get('from').value);
        // Launch post request
        this.httpStewardService.sendFile('atlas/repair/upload', body).subscribe(
            data => {
                if (data.code === 200 || data.code === 201) {
                    this.notify.showSuccess('Data Updated Successfully');
                } else {
                    this.notify.showWarning('Oops Something went horribly wrong! Try again later.');
                    // this.notify.showWarning(data.message);
                }
            }
        );
        this.goTo();
    }

    get f() {
        return this.upload.controls;
    }

    goTo() {
        this.router.navigate([
            '../../../trcm-lab-automation/components/receiving'
        ]);
    }
}
