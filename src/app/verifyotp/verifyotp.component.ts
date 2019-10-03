import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpStewardService} from '../shared/services/http-steward.service';
import {LocalStorage} from '@ngx-pwa/local-storage';


@Component({
    selector: 'app-verifyotp',
    templateUrl: './verifyotp.component.html',
    styleUrls: ['./verifyotp.component.scss'],
    animations: [routerTransition()]
})
export class VerifyotpComponent implements OnInit {

    model: any = {};
    isFailed = false;
    message: string;

    constructor(public router: Router, public snackBar: MatSnackBar, private stewardService: HttpStewardService<any, any>, protected locStorage: LocalStorage) {
        // localStorage.
    }

    ngOnInit() {

    }

    verifyOtp(form: NgForm) {
        const params = new URLSearchParams();
        params.append('otp', this.model.otp);
    
        this.stewardService.postFormData('ufs-common-modules/api/v1/otp/verification', this.model).subscribe(response => {
            // //('testing otp', response);
                if (response.code === 200) {
                    localStorage.setItem('username', response.data.userDetails.fullName);
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('userData', JSON.stringify(response));
                    localStorage.setItem('perm', JSON.stringify(response.data.permissions));
            
                    this.locStorage.setItem('username', response.data.userDetails.fullName).subscribe(() => {});
                    this.locStorage.setItem('isLoggedin', true).subscribe(() => {});
                    this.locStorage.setItem('userData', response).subscribe(() => {});
                    this.locStorage.setItem('perm', response.data.permissions).subscribe(() => {});
                
                    // return true to indicate successful verification
                    this.router.navigate(['/trcm-lab-automation/components/dashboard']);
                } else {
                    this.snackBar.open(response.message, 'Notification', {
                        duration: 5000,
                        panelClass: 'snackbar-success',
                        horizontalPosition: 'right'
                    });
                }
            },
            error => {
                form.resetForm();
                //(error);
                this.isFailed = true;
                this.message = error.error.message;
                this.snackBar.open(error.error.message, 'Notification', {
                    duration: 5000,
                    panelClass: 'snackbar-success',
                    horizontalPosition: 'right'
                });
            });
    }

    resendOtp() {
        this.stewardService.gett('ufs-common-modules/api/v1/otp/resend').subscribe(response => {
                this.snackBar.open(response.message, 'Notification', {
                    duration: 5000,
                    panelClass: 'snackbar-success',
                    horizontalPosition: 'right'
                });
            },
            error => {
                //(error);
            });
    }
}