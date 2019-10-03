import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared';


const routes: Routes = [
   {path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]},
    {path: 'login', loadChildren: './login/login.module#LoginModule'},
    {path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule'},
    {path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule'},
    {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
    {path: 'verifyotp', loadChildren: './verifyotp/verifyotp.module#VerifyotpModule'},
    {path: 'recaptcha', loadChildren:'./Recaptcha/recaptcha.module#RecaptchaModule'},
    {path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'},
    {path: 'change-password', loadChildren: './change-password/change-password.module#ChangeComponentModule'},
    {path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
