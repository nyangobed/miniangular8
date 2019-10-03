import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { routerTransition } from '../../../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Notify } from '../../../../../shared/classes/notify';
import { HttpStewardService } from '../../../../../shared/services/http-steward.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    animations: [routerTransition()]
})
export class CreateComponent implements OnInit {
    assign: FormGroup;
    updateData: FormGroup;
    ids = [];
    Repair: any;
    submitted = false;
    isUpdate = false;
    user: any;

    repairCentre = [
        'Ingenico',
        'Tracom'
    ];

    id: number;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private httpStewardService: HttpStewardService<any, any>,
        private notify: Notify,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        const inst = this;

        this.httpStewardService.get('ufs-common-modules/api/v1/user/technicians').subscribe(response => {

            if (response.code === 200) {
                inst.user = response.data;
            } else {
                this.notify.showWarning('Oops Something went horribly wrong! Try again later.');
                // inst.notify.showWarning(response.message);
            }
        });

        /** CALL THE FUNCTION ON INITIALIZATION */
        this.createForm();

        /** CREATE A FORM THAT WILL BE USED IN UPDATING. */
        this.updateData = this.fb.group({
            ids: '',
            repairModel: ''
        });

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

                        this.Repair = form.data;
                        this.assign
                            .get('devices')
                            .get('serialnumber')
                            .setValue(this.Repair.devices.serialnumber);
                        this.assign
                            .get('devices')
                            .get('partnumber')
                            .setValue(this.Repair.devices.partnumber);
                        this.assign
                            .get('devices')
                            .get('deviceowner')
                            .setValue(this.Repair.devices.deviceowner);
                        this.assign.get('levels').setValue(this.Repair.levels);
                        this.assign
                            .get('repairCentre')
                            .setValue(this.Repair.repairCentre);
                        this.assign
                            .get('users')
                            .setValue(this.Repair.users.fullName);
                        this.updateData
                            .get('ids')
                            .setValue(this.Repair.Id);
                    });
            }
        });
    }

    /** CREATE THE FORM FIELDS THAT WILL BE USED TO SEND DATA TO THE API */
    createForm() {
        this.assign = this.fb.group({
            devices: this.fb.group({
                serialnumber: [
                    { value: '', disabled: true }, [Validators.required]
                ],
                partnumber: [
                    { value: '', disabled: true }, [Validators.required]
                ],
                deviceowner: [
                    { value: '', disabled: true }, [Validators.required]
                ]
            }),
            levels: [{ value: '', disabled: true }, [Validators.required]],
            repairCentre: ['', [Validators.required]],
            users: ['', [Validators.required]],
                comments: '',
                deviceErrors: this.fb.array([]),
                failureFound: '',
                parts: this.fb.array([]),
                qaTest: '',
                repairStatus: '',
                reportedDefects: ''
        });
    }

    /** GET THE FORM CONTROLS SUCH AS VALIDATIONS */
    get f() {
        return this.assign.controls;
    }

    /** REDIRECT TO THE SPECIFIED PAGE */
    goTo() {
        this.router.navigate([
            '../../../trcm-lab-automation/components/assigning'
        ]);
    }

    /** SEND THE DATA WHEN THE SUBMIT METHOD IS CALLED */
    onSubmit() {
        this.submitted = true;

        /** SET THE VALUE OF ASSIGN FORM TO REPAIRMODEL IN UPDATEDATA */
        this.updateData.get('repairModel').setValue(this.assign.value);

        /** PUSH THE IDS VALUE IN UPDATEDATA TO THE IDS ARRAY */
        this.ids.push(this.updateData.get('ids').value);

        /** SET THE IDS VALUE IN UPDATEDATA TO THE NEW ARRAY VALUE */
        this.updateData.get('ids').setValue(this.ids);



            this.httpStewardService.put('atlas/repair/update', this.updateData.value)
                .subscribe(data => {
                if (data.code === 200 || data.code === 201) {
                    this.notify.showSuccess('Data Updated Successfully');
                } else {
                    this.notify.showWarning('Oops Something went horribly wrong! Try again later.');
                    // this.notify.showWarning(data.message);
                }
    });
            this.goTo();
    }
}
