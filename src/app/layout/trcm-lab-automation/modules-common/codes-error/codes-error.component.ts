import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';
import { Router } from '@angular/router';
import { CodesError } from './codes-error-model';

@Component({
  selector: 'app-codes-error',
  templateUrl: './codes-error.component.html',
  styleUrls: ['./codes-error.component.scss'],
  animations: [routerTransition()]
})
export class CodesErrorComponent implements OnInit  {
  isUpdate = false;
  // customers = {
  //   firstname : '',
  //   lastname : '',
  //   email : '',
  //   address : '',
  //   phone : '',
  //   country : '',
  //   contactperson: '' ,
  // };
  // countryHasError = true;
  //  errorMsg = '';
  //  errorCodes = new CodesError( );
  //  private router: Router;
  
  // constructor(private onboardingservices: ModulesCommon) { }
  // validateCountry(value) {
  //   if (value === 'selected') {
  //       this.countryHasError = true;
  //   } else {
  //     this.countryHasError = false;
  //   }
  // }
    ngOnInit() {
    }
  //   onSubmit() {
  //     this.submitted = true;
  //     this.onboardingservices.Enroll(this.errorCodes)
  //     .subscribe(
  //       data => //('sucess', data),
  //        error => this.errorMsg = error.statusText
  //            this.router.navigate(['create-customers']);
  //     );
  //   //(this.userModel);
  //   }
  }