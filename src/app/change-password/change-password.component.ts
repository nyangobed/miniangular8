import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {ChangepassWrapper} from '../entities/wrappers/change-pass-wrapper';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpStewardService} from '../shared/services/http-steward.service';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    animations: [routerTransition()]
})
export class ChangePasswordComponent implements OnInit {
    model: ChangepassWrapper;
    isFailed = false;
    message: string;
    currentYear = new Date().getFullYear();

    constructor(private router: Router, public snackBar: MatSnackBar, private stewardService: HttpStewardService<any, any>) {
        this.model = new ChangepassWrapper();
    }

    ngOnInit() {
    }

    changePass(form: NgForm) {
        let inst = this;
    this.stewardService.postNoToken('ufs-common-modules/api/v1/change-password/first-time', this.model).subscribe((response) => {
        // //(response);
        // tslint:disable-next-line:triple-equals
        if (response.code == 200) {
            this.router.navigate(['/login']);
        } else {
            this.snackBar.open(response.message, 'Notification', {
             duration: 5000,
              panelClass: 'snackbar-success',
             horizontalPosition: 'right'
            });
        }
      }
        , error => {
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
