import {Component, OnInit, Input} from '@angular/core';
import {CheckerActions} from '../../entities/wrappers/checker-actions';
import {NgbModalRef, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpStewardService} from '../../shared/services/http-steward.service';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
import {Notify} from '../../shared/classes/notify';
import { OnboardingserviceService } from '../trcm-lab-automation/onboarding/onboardingservice.service';
import { customer } from '../trcm-lab-automation/onboarding/Entities/customer-model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checker-changes',
    templateUrl: './checker-changes.component.html',
    styleUrls: ['./checker-changes.component.scss']
})
export class CheckerChangesComponent implements OnInit {

    @Input() checkerActions: CheckerActions<any>;
    formGroup: FormGroup;
    @Input() selectedIds: Array<any>;
    @Input() endpoint: string;
    // tslint:disable-next-line:no-inferrable-types
    @Input() approveLabel: string = 'Approve';
    // tslint:disable-next-line:no-inferrable-types
    @Input() declineLabel: string = 'Decline';
    modal: NgbModalRef;
    customers = new customer();

    constructor(
       protected onboardingservices: OnboardingserviceService<any, any>,
        protected stewardService: HttpStewardService<any, any>,
        private router: Router,
         protected notify: Notify, protected modalService: NgbModal) {
        this.checkerActions = new CheckerActions();
        this.checkerActions.action = 'approve';
    }



    ngOnInit(): void {
        this.formGroup = new FormGroup({
            action: new FormControl()
        });
    }


    approve(form: NgForm) {
        this.checkerActions.ids = this.selectedIds;
        if (this.checkerActions.notes == null) {
            this.checkerActions.notes = '';
        }
        this.stewardService.putNoToken(this.endpoint + '/' + this.checkerActions.action.toLowerCase() + '-actions', this.checkerActions).subscribe((response) => {
            //(response);
            if (response.code === 200) {
                this.modal.close();
                this.notify.showSuccess(response.message);
                $($.fn.dataTable.tables(true)).DataTable().ajax.reload(null, false);
                this.resetForm(form);
            } else {
                this.notify.showWarning(response.message);
            }
        });
    }

    resetForm(form: NgForm) {
        form.resetForm();
    }

    open(content: any, action: string) {
        this.checkerActions.action = action;
        this.modal = this.modalService.open(content);
    }

}
