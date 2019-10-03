import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../shared/classes/error-state-handler';
import {MatSnackBar} from '@angular/material';
import {HttpStewardService} from '../shared/services/http-steward.service';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    model: any = {};
    isFailed = false;
    message: string;
    currentYear = new Date().getFullYear();

    loginFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    matcher = new MyErrorStateMatcher();
    constructor(public router: Router, public snackBar: MatSnackBar, private stewardService: HttpStewardService<any, any>, protected locStorage: LocalStorage) {
    }

    ngOnInit() {
    }


    onLoggedin(form: NgForm) {
        const params = new URLSearchParams();
        params.append('username', this.model.email);
        params.append('password', this.model.password);
        params.append('grant_type', 'password');
        // params.append('client_id', 'user_client');  // process-login
        this.stewardService.postLogin('ufs-common-modules/api/v1/oauth/token', params.toString()).subscribe((response) => {
                //(response);
                if (response.code === 400) {
                    this.snackBar.open(response.message,
                        'Notification', {duration: 5000, panelClass: 'snackbar-success', horizontalPosition: 'right'});
                        // this.router.navigate(['/change-password']);
                } else if (response.code === 410) {
                    this.router.navigate(['/change-password']);
                } else if (response.code === 200) {                    
                    this.router.navigate(['/recaptcha']).then(isNavigated => {
						if(isNavigated) {
							// window.location.reload(true);
						}
					});
                } else {
                    if (response.access_token.length !== 0) {
                        localStorage.setItem('access_token', response.access_token);
                        // localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/recaptcha']);
                        // this.router.navigate(['/verifyotp']).then(isNavigated => {
                        //     if(isNavigated) {
                        //         window.location.reload(true);
                        //     }
                        // });
                    } else {
                        this.snackBar.open(response.message,
                            'Notification', {duration: 5000, panelClass: 'snackbar-success', horizontalPosition: 'right'});
                    }
                    // this.snackBar.open(response.message,
                    //    'Notification', {duration: 5000, panelClass: 'snackbar-success', horizontalPosition: 'right'});
                }
            },
            error => {
                if (error.error.message === 'Sorry password has expired') {
                    this.router.navigate(['ufs-common-modules/api/v1/change-password']);
                } else {
                    this.isFailed = true;
                    this.message = error.error.message;
                    this.snackBar.open(error.error.message, 'Notification', {
                        duration: 5000,
                        panelClass: 'snackbar-success',
                        horizontalPosition: 'right'
                    });
                }
            });
    }
}
