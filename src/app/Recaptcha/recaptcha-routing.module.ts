import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecaptchaComponent } from './recaptcha.component';

const routes: Routes = [
  {
    path: '',
    component: RecaptchaComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecaptchaRoutingModule { }
