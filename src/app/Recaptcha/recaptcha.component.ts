import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpStewardService } from '../shared/services/http-steward.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../router.animations';
import { CaptchaWrapper } from '../entities/wrappers/recaptcha';
import {LocalStorage} from '@ngx-pwa/local-storage';
declare var grecaptcha: any;

@Component({
  selector: 'app-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss'],
  animations: [routerTransition()]
})
export class RecaptchaComponent implements OnInit {

  captchaForm: FormGroup;
  model: CaptchaWrapper;
  captchaError: boolean = false;
  submitted: boolean = false;
  @ViewChild('recaptcha') recaptchaElement: ElementRef;


  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    private stewardService: HttpStewardService<any, any>,
    private formBuilder: FormBuilder,
    protected locStorage: LocalStorage
  ) {
  this.model = new CaptchaWrapper();
  }

  ngOnInit() {
    /** on page load display the captcha form */
    this.createForm();
    this.addRecaptchaScript();
  }

  /** CAPTCHA FORM */
  createForm() {
    this.captchaForm = this.formBuilder.group({});
  }

  /** function to send captcha data */
  onSubmit() {
    const that = this;
    that.submitted = true;
   this.model.response = grecaptcha.getResponse();  
    that.stewardService.post('ufs-common-modules/api/v1/captcha_registration', this.model).subscribe(response => {
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
          that.snackBar.open(response.message, 'Notification', {
            duration: 5000,
            panelClass: 'snackbar-success',
            horizontalPosition: 'right'
          });
        }
        grecaptcha.reset();
      });
  }
  /*recaptcha*/

  renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6Lf5BLsUAAAAADjU6u9LC3hGonBhZ0-b0B0sEs_e',
      'callback': (response) => {
        
      }
    });
  }
 
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }
 
  /*recaptcha*/

}
