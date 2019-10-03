import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { Levels } from '../../../models/repair/levels';
import { routerTransition } from '../../../../../router.animations';
import { Notify } from '../../../../../shared/classes/notify';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';

@Component({
    selector: 'app-view-screening',
    templateUrl: './view-screening.component.html',
    styleUrls: ['./view-screening.component.scss'],
    animations: [routerTransition()]
})
export class ViewScreeningComponent implements OnInit {

    /** Declare the bindings that will hold data */
    myForm: FormGroup;
    Repair: any;
    error = [];
    submitted = false;
    isUpdate = false;
    id: number;

    repairLevel = [
      'LEVEL 1',
      'LEVEL 2',
      'LEVEL 3',
      'LEVEL 4',
    ];

    repairCentre = [
        'Ingenico',
        'Tracom'
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private notify: Notify,
        private activatedRoute: ActivatedRoute,
        private httpStewardService: HttpStewardService<any, any>
    ) {}

    ngOnInit() {
        const inst = this;

        this.httpStewardService.get('atlas/device_error').subscribe((response) => {
            if (response.code === 200) {
            inst.error = response.data.content;
                // //(inst.error);
            } else {
                inst.notify.showWarning(response.message);
            }
        });

        /** call the create form method */
        this.createForm();

        /**
         *
         * Retrieve data being edited
         *
         */
        this.activatedRoute.params.subscribe(params => {
            if (params['id'] != null) {
                this.isUpdate = true;
                this.httpStewardService
                    .get('atlas/repair/' + params['id'])
                    .subscribe(form => {
                        this.id = params['id'];
                        //(this.id);
                        //('Testing 1', form.data);

                        this.Repair = form.data;

                        this.myForm
                            .get('batchNumber')
                            .setValue(this.Repair.batchNumber);
                        this.myForm
                            .get('devices')
                            .get('serialnumber')
                            .setValue(this.Repair.devices.serialnumber);
                        this.myForm
                            .get('devices')
                            .get('partnumber')
                            .setValue(this.Repair.devices.partnumber);
                        this.myForm
                            .get('devices')
                            .get('imeinumber')
                            .setValue(this.Repair.devices.imeinumber);
                        this.myForm
                            .get('devices')
                            .get('deviceowner')
                            .setValue(this.Repair.devices.deviceowner);
                        this.myForm
                            .get('deviceErrors')
                            .setValue(this.Repair.deviceErrors.code);
                        this.myForm
                            .get('levels')
                            .setValue(this.Repair.levels);
                        this.myForm
                            .get('repairCentre')
                            .setValue(this.Repair.repairCentre);
                    });
            }
        });
    }

    createForm() {
        this.myForm = this.fb.group({
            devices: this.fb.group({
                serialnumber: [
                    { value: '', disabled: true },
                    [Validators.required]
                ],
                partnumber: [
                    { value: '', disabled: true },
                    [Validators.required]
                ],
                imeinumber: [
                    { value: '', disabled: true },
                    [Validators.required]
                ],
                deviceowner: [
                    { value: '', disabled: true },
                    [Validators.required]
                ]
            }),
            batchNumber: [{ value: '', disabled: true }, [Validators.required]],
            deviceErrors: ['', [Validators.required]],
            repairCentre: ['', [Validators.required]],
            levels: ['', [Validators.required]],
        });
    }


    /** GET THE FORM CONTROLS THAT HELP TO GET VALIDATIONS AND OTHER METHODS */
    get f() {
        return this.myForm.controls;
    }

    /**
     *
     * REDIRECT TO THE SCREENING DATATABLE AFTER UPDATE / VIEW
     *
     */
    goTo() {
        this.router.navigate([
            '../../../trcm-lab-automation/components/screening'
        ]);
    }

    /** SUBMIT THE FORM WITH UPDATED VALUES */
    onSubmit() {
        this.submitted = true;

        if (this.isUpdate) {
            //('Testing 3', this.myForm.value);

            /** update the fields in the repair object */
            // this.Repair.deviceErrors.push(this.myForm.value.deviceErrors.codeName);
            // this.Repair.levels.push(this.myForm.value.levels);
            // this.Repair.repairCentre = this.myForm.value.repairCentre;

            try {
                /** SEND THE WHOLE OBJECT PLUS THE UPDATED FIELDS */
                this.httpStewardService.put(`atlas/repair/update/${this.Repair.id}`, this.myForm.value).subscribe(
                  // log results
                  data => {
                    //('success', data);
                }
                );

            } catch (error) {
                //(error);
            }
            this.goTo();
        }
    }
}
