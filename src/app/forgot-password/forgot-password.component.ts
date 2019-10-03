import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import { NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpStewardService} from '../shared/services/http-steward.service';
import { ForgotPasswordModule } from './forgot-password.module';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
   
    upload: FormGroup;

    isFailed = false;
    message: string;
    currentYear = new Date().getFullYear();

    constructor(public router: Router, private fb: FormBuilder,public snackBar: MatSnackBar, private stewardService: HttpStewardService<any, any>) {
    }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.upload = this.fb.group({
        email: ['']
        });
      }
    resetPass(form: NgForm) {
        const body = new FormData();
       body.append('email', this.upload.get('email').value);
        this.stewardService.sendFile('ufs-common-modules/api/v1/reset-password', body).subscribe(response => {
                if (response.code === 200) {
                    // //(response.message);
                    this.snackBar.open(response.message, 'Notification', {
                        duration: 5000,
                        panelClass: 'snackbar-success',
                        horizontalPosition: 'right'
                    });
                    this.router.navigate(['/login']);
                } else {
                    // return false to indicate failed login
                    this.snackBar.open(response.message, 'Notification', {
                        duration: 5000,
                        panelClass: 'snackbar-success',
                        horizontalPosition: 'right'
                    });
                }
            },
            error => {
                form.resetForm();
                this.isFailed = true;
                this.message = error.error.message;
                this.snackBar.open(error.error.message, 'Notification', {
                    duration: 5000,
                    panelClass: 'snackbar-success',
                    horizontalPosition: 'right'
                });
            });
    }

}